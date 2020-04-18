import { useState, useEffect } from 'react';
import { keys, subscribe } from './bus';

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
    const subscription = subscribe(keys.TRANSACTIONS, setActivities);
    return () => subscription.unsubscribe();
  }, []);

  return activities;
};

export const authUserHook = () => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const subscription = subscribe(keys.AUTH_USER, setAuthUser, true);
    return () => subscription.unsubscribe();
  }, []);

  return authUser;
};
