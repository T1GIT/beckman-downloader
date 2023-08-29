import { Job } from 'bullmq';
import { TaskName } from '../constants/task-name';
import { RefreshPayload } from '../types/refresh-payload';
import { crawlerService } from '../services/crawler.service';
import { queueService } from '../services/queue.service';
import { Sequelize } from 'sequelize-typescript';
import { env } from '../../shared/utils/env';
import { DocumentModel } from '../../documents/models/document.model';
import { SourceModel } from '../../sources/models/source.model';

export const connection = new Sequelize({
  database: env.PG_NAME,
  dialect: 'postgres',
  username: env.PG_USERNAME,
  password: env.PG_PASSWORD,
  host: env.PG_HOST,
  port: env.PG_PORT,
  logging: false,
  models: [DocumentModel, SourceModel],
});

const handlers = {
  async [TaskName.CHECK](job: Job) {
    const sources = await crawlerService.checkSources();

    await Promise.all(sources.map(({ id }) => queueService.refresh(id)));

    return sources;
  },

  async [TaskName.REFRESH](job: Job) {
    const { source_id } = job.data as RefreshPayload;

    const documents = await crawlerService.refreshSource(
      source_id,
      500,
      (progress) => job.updateProgress(progress),
    );

    documents.length;
  },
};

module.exports = async (job: Job) => handlers[job.name](job);
