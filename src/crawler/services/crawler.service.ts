import { sourcesService } from '../../sources/services/sources.service';
import { SourceModel } from '../../sources/models/source.model';
import { beckmanService } from './beckman.service';
import { DocumentModel } from '../../documents/models/document.model';
import { InferAttributes } from 'sequelize';
import { documentsService } from '../../documents/services/documents.service';
import { documentCreateConvertor } from '../convertors/document-create.convertor';
import { Job } from 'bullmq';

export const crawlerService = {
  async checkSources(): Promise<InferAttributes<SourceModel>[]> {
    const { data: sources } = await sourcesService.getAll();

    const needRefreshSources: InferAttributes<SourceModel>[] = [];
    for (const source of sources) {
      const { total } = await beckmanService.getAll(source.url, 0, 1);
      if (!source.refreshing && total > (source.total ?? 0)) {
        needRefreshSources.push(source);
      }
    }

    return needRefreshSources;
  },

  async refreshSource(
    sourceId: number,
    batchSize: number = 500,
    progressFn?: (progress: number) => void | Promise<void>,
  ): Promise<InferAttributes<DocumentModel>[]> {
    const source = await sourcesService.getById(sourceId);
    const beckman = await beckmanService.getAll(source.url, 0, 1);

    if (source.refreshing) {
      return [];
    }

    await sourcesService.startRefreshing(sourceId);

    const first = Math.floor(source.total / batchSize);
    const last = Math.floor(beckman.total / batchSize);

    const added: InferAttributes<DocumentModel>[] = [];
    for (let page = first; page <= last; page++) {
      const { results } = await beckmanService.getAll(
        source.url,
        page,
        batchSize,
      );
      const documents = results
        .map(documentCreateConvertor.fromBeckmanDocument)
        .map((d) => ({ ...d, source_id: sourceId }));

      const candidates =
        page === 0 ? documents.slice(source.total % batchSize) : documents;
      const created = await documentsService.createMany(candidates);
      added.push(...created);

      await sourcesService.setTotal(sourceId, source.total + added.length);

      const progress =
        Math.round(((page - first + 1) / (last - first + 1)) * 1000) / 1000;
      await progressFn(progress);
    }

    await sourcesService.finishRefreshing(sourceId);

    return added;
  },
};
