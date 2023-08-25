import { Module } from '../core/types/module';
import { queueService } from './services/queue.service';
import { setUpWorker } from './utils/worker';

export const crawlerModule: Module = {
  async init() {
    setUpWorker();

    queueService.watch();
  },
};
