import { DefaultJobOptions, Queue } from 'bullmq';
import { QueueName } from '../constants/queue-name';
import { TaskName } from '../constants/task-name';
import { RefreshPayload } from '../types/refresh-payload';
import { connectionOptions } from '../constants/connection-options';

const queue = new Queue(QueueName.CRAWLER, {
  connection: connectionOptions,
});

const options: DefaultJobOptions = {
  attempts: 5,
};

export const queueService = {
  async watch() {
    await queue.add(TaskName.CHECK, undefined, {
      ...options,
      repeat: {
        immediately: true,
        every: 30 * 60 * 1000,
      },
    });
  },
  async refresh(sourceId: number) {
    const payload: RefreshPayload = {
      source_id: sourceId,
    };
    await queue.add(TaskName.REFRESH, payload, options);
  },
};
