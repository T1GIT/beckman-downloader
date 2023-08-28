import { Worker } from 'bullmq';
import { QueueName } from '../constants/queue-name';
import * as path from 'path';
import { connectionOptions } from '../constants/connection-options';
import fs from 'fs';

export function setUpWorker() {
  const processorPath = fs.existsSync(path.join(__dirname, 'processor.ts'))
    ? path.join(__dirname, 'processor.ts')
    : path.join(__dirname, 'processor.js');

  const worker = new Worker(QueueName.CRAWLER, processorPath, {
    connection: connectionOptions,
    autorun: true,
    concurrency: 50,
  });

  worker.on('active', (job) =>
    console.log(
      `Job ${job.name} with id ${job.id} and data ${JSON.stringify(
        job.data,
      )} has been started`,
    ),
  );
  worker.on('progress', (job, progress) =>
    console.log(
      `Job ${job.name} with id ${job.id} with data ${JSON.stringify(
        job.data,
      )} reported the progress ${JSON.stringify(progress)}`,
    ),
  );
  worker.on('completed', (job, result) =>
    console.log(
      `Job ${job.name} with id ${job.id} and data ${JSON.stringify(
        job.data,
      )} has been completed. Result is ${JSON.stringify(result)}`,
    ),
  );
  worker.on('error', (error) =>
    console.log(`Error caused ${JSON.stringify(error)}`),
  );

  return worker;
}
