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
  });
}
