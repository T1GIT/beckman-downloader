import { sourcesService } from '../../sources/services/sources.service';
import { SourceModel } from '../../sources/models/source.model';
import { beckmanService } from './beckman.service';
import { DocumentModel } from '../../documents/models/document.model';
import { InferAttributes } from 'sequelize';
import { documentsService } from '../../documents/services/documents.service';
import { documentCreateConvertor } from '../convertors/document-create.convertor';
import { Job } from 'bullmq';
import { queueService } from './queue.service';

export const crawlerService = {
  async continue(): Promise<InferAttributes<SourceModel>[]> {
    const sources = await sourcesService.getAllByRefreshing(true);

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
  },

  async check(): Promise<InferAttributes<SourceModel>[]> {
    const sources = await sourcesService.getAllByRefreshing(false);

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
  },

  async refresh(
    sourceId: number,
    batchSize: number = 500,
    progressFn?: (progress: number) => void | Promise<void>,
  ): Promise<InferAttributes<DocumentModel>[]> {
    const source = await sourcesService.getById(sourceId);
    const beckman = await beckmanService.getAll(source.path, 0, 1);

    await sourcesService.startRefreshing(sourceId);

    const first = Math.floor(source.total / batchSize);
    const last = Math.floor(beckman.total / batchSize);

    const added: InferAttributes<DocumentModel>[] = [];
    for (let page = first; page <= last; page++) {
      const { results } = await beckmanService.getAll(
        source.path,
        page,
        batchSize,
      );
      const documents = results
        .map(documentCreateConvertor.fromBeckmanDocument)
        .map((d) => ({ ...d, source_id: sourceId }));

      const candidates = documents.slice(
        page === first ? source.total % batchSize : null,
        page === last ? beckman.total % batchSize : null,
      );

      const downloaded = await Promise.all(
        candidates.map(async (candidate) => ({
          ...candidate,
          file: await beckmanService.getFile(candidate.external_id),
        })),
      );

      const created = await documentsService.createMany(downloaded);
      added.push(...created);

      await sourcesService.setTotal(sourceId, source.total + added.length);

      const progress =
        Math.round(((page - first + 1) / (last - first + 1)) * 1000) / 1000;
      await progressFn?.(progress);
    }

    await sourcesService.finishRefreshing(sourceId);

    return added;
  },
};
