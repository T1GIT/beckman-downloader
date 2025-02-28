import { Queue } from 'bullmq';
import { QueueName } from '../constants/queue-name';
import { TaskName } from '../constants/task-name';
import { RefreshPayload } from '../types/refresh-payload';
import { connectionOptions } from '../constants/connection-options';
import { refreshInterval } from '../constants/refresh-interval';

const queue = new Queue(QueueName.CRAWLER, { connection: connectionOptions });

export const queueService = {
  async watch(): Promise<void> {
    const client = await queue.client;
    client.once('ready', () => queueService.watch());

    await queue.add(TaskName.CONTINUE, undefined);

    await queue.add(TaskName.CHECK, undefined, {
      repeat: {
        immediately: true,
        every: refreshInterval,
      },
    });
  },

  async refresh(sourceId: number): Promise<void> {
    const jobs = await queue.getActive();
    const exists = jobs.some(
      ({ name, data }) =>
        name === TaskName.REFRESH && data.source_id === sourceId,
    );

    if (!exists) {
      const payload: RefreshPayload = { source_id: sourceId };
      await queue.add(TaskName.REFRESH, payload);
    }
  },
};
