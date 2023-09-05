import { sourcesService } from '../../sources/services/sources.service';
import { SourceModel } from '../../sources/models/source.model';
import { beckmanService } from './beckman.service';
import { DocumentModel } from '../../documents/models/document.model';
import { CreationAttributes, InferAttributes } from 'sequelize';
import { documentsService } from '../../documents/services/documents.service';
import { documentCreateConvertor } from '../convertors/document-create.convertor';
import { Job } from 'bullmq';
import { queueService } from './queue.service';

async function refreshSources(
  sources: InferAttributes<SourceModel>[],
): Promise<InferAttributes<SourceModel>[]> {
  const candidates: InferAttributes<SourceModel>[] = [];
  await Promise.all(
    sources.map(async (source) => {
      const { total } = await beckmanService.getAll(source.path, 0, 1);
      if (total > (source.total ?? 0)) {
        candidates.push(source);
      }
    }),
  );

  await Promise.all(candidates.map(({ id }) => queueService.refresh(id)));

  return candidates;
}

async function insertFile(
  document: Omit<CreationAttributes<DocumentModel>, 'file'>,
): Promise<CreationAttributes<DocumentModel>> {
  const file = await beckmanService.getFile(
    document.external_id,
    document.document_number,
  );

  return { ...document, file };
}

async function downloadPage(
  source: InferAttributes<SourceModel>,
  total: number,
  first: number,
  last: number,
  page: number,
  batch: number,
): Promise<InferAttributes<DocumentModel>[]> {
  const { results } = await beckmanService.getAll(source.path, page, batch);

  const documents = results
    .map(documentCreateConvertor.fromBeckmanDocument)
    .map((d) => ({ ...d, source_id: source.id }));

  const candidates = documents.slice(
    page === first ? source.total % batch : undefined,
    page === last ? total % batch : undefined,
  );

  const downloaded = await Promise.all(candidates.map(insertFile));

  return documentsService.createMany(downloaded);
}

export const crawlerService = {
  async continue(): Promise<InferAttributes<SourceModel>[]> {
    const sources = await sourcesService.getAllByRefreshing(true);

    return refreshSources(sources);
  },

  async check(): Promise<InferAttributes<SourceModel>[]> {
    const sources = await sourcesService.getAllByRefreshing(false);

    return refreshSources(sources);
  },

  async refresh(
    sourceId: number,
    job?: Job,
  ): Promise<InferAttributes<DocumentModel>[]> {
    const batch = 100;

    const source = await sourcesService.getById(sourceId);
    const { total } = await beckmanService.getAll(source.path, 0, 1);

    await sourcesService.startRefreshing(sourceId);

    const first = Math.floor(source.total / batch);
    const last = Math.floor(total / batch);

    const added: InferAttributes<DocumentModel>[] = [];
    for (let page = first; page <= last; page++) {
      const created = await downloadPage(
        source,
        total,
        first,
        last,
        page,
        batch,
      );
      added.push(...created);

      await sourcesService.setTotal(sourceId, source.total + added.length);

      const progress =
        Math.round(((page - first + 1) / (last - first + 1)) * 10000) / 10000;
      await job?.updateProgress(progress);
    }

    await sourcesService.finishRefreshing(sourceId);

    return added;
  },
};
