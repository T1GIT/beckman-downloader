import Router from 'koa-router';
import { Model } from 'sequelize-typescript';
import Application from 'koa';

export interface Module<M extends Model = any> {
  controllers?: Router[];
  models?: M[];
  init?: () => Promise<void> | void;
}
