import Koa from 'koa';
import { initCoreModule } from './modules/core';
import { initCrawlerModule } from './modules/crawler';
import { initSharedModule } from './modules/shared';
import { initDocumentsModule } from './modules/documents';

const app = new Koa();

(() => {
  initCoreModule(app);
  initSharedModule(app);
  initDocumentsModule(app);
  initCrawlerModule(app);
})();
