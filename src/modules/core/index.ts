import Application from 'koa';
import process from 'process';
import { connection } from './utils/database';

export function initCoreModule(app: Application) {
  connection.sync({ alter: true }).then(() =>
    app.listen(5000, async () => {
      console.log(`App has been started in ${process.env.NODE_ENV} mode`);
    }),
  );
}
