import Koa from 'koa';
import { coreModule } from './core';
import { crawlerModule } from './crawler';
import { sharedModule } from './shared';
import { documentsModule } from './documents';
import { initModules } from './core/utils/init-modules';
import { sourcesModule } from './sources';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
app.use(bodyParser());

initModules(app, [
  coreModule,
  sharedModule,
  documentsModule,
  sourcesModule,
  crawlerModule,
]);
