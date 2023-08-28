import { DefaultJobOptions, Queue } from 'bullmq';
import { QueueName } from '../constants/queue-name';
import { TaskName } from '../constants/task-name';
import { RefreshPayload } from '../types/refresh-payload';
import { connectionOptions } from '../constants/connection-options';
import { refreshInterval } from '../constants/refresh-interval';
import { documentsService } from '../../documents/services/documents.service';
import { documentCreateConvertor } from '../convertors/document-create.convertor';

const queue = new Queue(QueueName.CRAWLER, {
  connection: connectionOptions,
});

const options: DefaultJobOptions = {
  // attempts: 5,
};

export const queueService = {
  async watch(): Promise<void> {
    await queue.add(TaskName.CHECK, undefined, {
      ...options,
      repeat: {
        immediately: true,
        every: refreshInterval,
      },
    });
  },
  async refresh(sourceId: number): Promise<void> {
    const payload: RefreshPayload = {
      source_id: sourceId,
    };
    await queue.add(TaskName.REFRESH, payload, options);
  },
};
