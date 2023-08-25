import { Job } from 'bullmq';

module.exports = async function (job: Job) {
  console.log(job);
};
