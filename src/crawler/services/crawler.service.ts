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
      if (source.refreshing || total > (source.last_total ?? 0)) {
        needRefreshSources.push(source);
      }
    }

    return needRefreshSources;
  },

  async refreshSource(
    sourceId: number,
    batchSize: number = 1000,
    progressFn?: (progress: number) => void | Promise<void>,
  ): Promise<InferAttributes<DocumentModel>[]> {
    const source = await sourcesService.getById(sourceId);
    const { total } = await beckmanService.getAll(source.url, 0, 1);

    if (!source.refreshing) {
      await sourcesService.setRefreshing(sourceId, true);
    }

    const firstPage = Math.floor(source.last_total / batchSize);
    const lastPage = Math.floor(total / batchSize);

    const addedDocuments: InferAttributes<DocumentModel>[] = [];
    for (let page = firstPage; page <= lastPage; page++) {
      const { results } = await beckmanService.getAll(
        source.url,
        page,
        batchSize,
      );
      const documents = results
        .map(documentCreateConvertor.fromBeckmanDocument)
        .map((d) => ({ ...d, source_id: sourceId }));

      const candidates =
        page === 0 ? documents.slice(source.last_total % batchSize) : documents;
      const created = await documentsService.createMany(candidates);
      addedDocuments.push(...created);

      const newTotal =
        source.last_total -
        (source.last_total % batchSize) +
        (page - firstPage + 1) * batchSize;
      await sourcesService.setLastTotal(sourceId, newTotal);

      const progress = (page - firstPage + 1) / (lastPage - firstPage + 1);
      await progressFn(progress);
    }

    await sourcesService.setRefreshing(sourceId, false);

    return addedDocuments;
  },
};
