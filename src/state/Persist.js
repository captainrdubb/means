import { state, keys, publish } from './Bus';

export const saveJob = (job) => {
  new Promise((resolve, reject) => {
    try {
      const temp = [];
      const jobs = state[keys.JOBS].getValue();
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
      for (let i in clients) {
        if (clients[i].id === client.id) temp.push(client);
        else temp.push(clients[i]);
      }
      publish(keys.CLIENTS, temp);
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
};
