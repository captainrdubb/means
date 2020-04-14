import { state, keys, publish } from './Bus';

export const saveJob = (job) => {
  new Promise((resolve, reject) => {
    try {
      const jobs = state[keys.JOBS].getValue();

      if (!job.id) {
        job.id = Math.round(Math.random() * (1000000 - 1) + 1);
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

export const deleteJobs = (ids) => {
  return new Promise((resolve, reject) => {
    try {
      const temp = [];
      const jobs = state[keys.JOBS].getValue();
      jobs.forEach((job) => {
        if (!ids.includes(job.id)) temp.push(job);
      });
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
      const clients = state[keys.CLIENTS].getValue();
      
      if (!client.id) {
        client.id = Math.round(Math.random() * (1000000 - 1) + 1);
        clients.push(client);
        publish(keys.CLIENTS, clients);
        resolve();
      }

      const temp = [];
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

export const deleteClients = (ids) => {
  return new Promise((resolve, reject) => {
    try {
      const temp = [];
      const clients = state[keys.CLIENTS].getValue();
      clients.forEach((client) => {
        if (!ids.includes(client.id)) temp.push(client);
      });
      publish(keys.CLIENTS, temp);
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
};

export const saveTransaction = (transaction) => {
  new Promise((resolve, reject) => {
    try {
      const transactions = state[keys.TRANSACTIONS].getValue();

      if (!transaction.id) {
        transaction.id = Math.round(Math.random() * (1000000 - 1) + 1);
        transactions.push(transaction);
        publish(keys.TRANSACTIONS, transactions);
        resolve();
      }

      const temp = [];
      for (let i in transactions) {
        if (transactions[i].id === transaction.id) temp.push(transaction);
        else temp.push(transactions[i]);
      }
      publish(keys.TRANSACTIONS, temp);
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
};

export const deleteTransaction = (ids) => {
  return new Promise((resolve, reject) => {
    try {
      const temp = [];
      const transactions = state[keys.TRANSACTIONS].getValue();
      transactions.forEach((transaction) => {
        if (!ids.includes(transaction.id)) temp.push(transaction);
      });
      publish(keys.TRANSACTIONS, temp);
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
};
