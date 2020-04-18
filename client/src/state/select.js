import { keys, state } from './bus';

export const selectJob = (id) => {
  if (!id) return null;
  const jobs = state[keys.JOBS].getValue();
  const index = jobs.findIndex((f) => f.id == id);
  return jobs[index];
};

export const selectClient = (id) => {
  if (!id) return null;
  const clients = state[keys.CLIENTS].getValue();
  const index = clients.findIndex((c) => c.id == id);
  return clients[index];
};

export const selectTransaction = (id) => {
  if (!id) return null;
  const transactions = state[keys.TRANSACTIONS].getValue();
  const index = transactions.findIndex((a) => a.id == id);
  return transactions[index];
};
