import { useState, useEffect } from 'react';
import { keys, subscribe } from './Subjects';

const useJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const subscription = subscribe(keys.JOBS, setJobs);
    return () => subscription.unsubscribe();
  });

  return jobs;
};

export default useJobs;
