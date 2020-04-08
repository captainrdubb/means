import { useState, useEffect } from 'react';
import { keys, subscribe, state } from './Bus';

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
  const activity = state[keys.ACTIVITY].getValue();
  const index = activity.findIndex((a) => a.id == id);
  return activity[index];
};

export const jobsHook = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const subscription = subscribe(keys.JOBS, setJobs);
    return () => subscription.unsubscribe();
  }, []);

  return jobs;
};

export const clientsHook = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const subscription = subscribe(keys.CLIENTS, setClients);
    return () => subscription.unsubscribe();
  }, []);

  return clients;
};

export const transactionHook = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const subscription = subscribe(keys.ACTIVITY, setActivities);
    return () => subscription.unsubscribe();
  }, []);

  return activities;
};
