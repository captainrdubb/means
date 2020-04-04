import { state, keys, publish } from './Bus';

export const saveJob = (job) => {
  new Promise((resolve, reject) => {
    try {
      const jobs = state[keys.JOBS].getValue();

      if (!job.id) {
        jobs.push(job);
        publish(keys.JOBS, jobs);
        resolve();
      }

      const temp = [];
      for (let i in jobs) {
        if (jobs[i].id === job.id) temp.push(job);
        else temp.push(jobs[i]);
      }
      publish(keys.JOBS, temp);
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
};

export const saveClient = (client) => {
  new Promise((resolve, reject) => {
    try {
      const temp = [];
      const clients = state[keys.CLIENTS].getValue();
      if (!client.id) {
        temp.push(client);
      } else {
        for (let i in clients) {
          if (clients[i].id === client.id) temp.push(client);
          else temp.push(clients[i]);
        }
      }
      publish(keys.CLIENTS, temp);
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
};
