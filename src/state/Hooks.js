import { useState, useEffect } from 'react';
import { keys, subscribe } from './Subjects';

export const jobsHook = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const subscription = subscribe(keys.JOBS, setJobs);
    return () => subscription.unsubscribe();
  });

  return jobs;
};

export const clientsHook = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const subscription = subscribe(keys.CLIENTS, setClients);
    return () => subscription.unsubscribe();
  });

  return clients;
};
