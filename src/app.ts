import Koa from 'koa';
import { coreModule } from './core';
import { crawlerModule } from './crawler';
import { sharedModule } from './shared';
import { documentsModule } from './documents';
import { initModules } from './core/utils/init-modules';
import { sourcesModule } from './sources';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

const app = new Koa();
app.use(bodyParser());
app.use(logger());

initModules(app, [
  coreModule,
  sharedModule,
  documentsModule,
  sourcesModule,
  crawlerModule,
]);
