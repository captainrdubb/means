import { state, keys } from './Subjects';

export const selectJob = (id) => {
  const jobs = state[keys.JOBS].getValue();
  const index = jobs.findIndex((f) => f.id == id);
  return jobs[index];
};

export const selectClient = (id) => {
  const clients = state[keys.CLIENTS].getValue();
  const index = clients.findIndex((c) => c.id == id);
  return clients[index];
};
