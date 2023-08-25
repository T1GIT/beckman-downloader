import Koa from 'koa';
import { coreModule } from './core';
import { crawlerModule } from './crawler';
import { sharedModule } from './shared';
import { documentsModule } from './documents';
import { initModules } from './core/utils/init-modules';

const app = new Koa();

initModules(app, [coreModule, sharedModule, documentsModule, crawlerModule]);
