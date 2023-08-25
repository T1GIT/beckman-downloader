import Koa from 'koa';
import { initCoreModule } from './core';
import { initCrawlerModule } from './crawler';
import { initSharedModule } from './shared';
import { initDocumentsModule } from './documents';

const app = new Koa();

(() => {
  initCoreModule(app);
  initSharedModule(app);
  initDocumentsModule(app);
  initCrawlerModule(app);
})();
