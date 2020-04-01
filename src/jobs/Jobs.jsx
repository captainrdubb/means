import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { JobItem } from '../partial';
import { publishTo, DATA_KEYS, useJobs } from '../state';

const useStyles = makeStyles((theme) => ({}));

export default (props) => {
  publishTo(DATA_KEYS.APP_BAR_HEADER, 'Jobs');
  
  const classes = useStyles();
  const history = useHistory();

  const jobs = useJobs();
  const onJobSelected = (job) => history.push(`/jobs/${job.id}/detail`);

  return (
    <List>
      {jobs.map((job, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && <Divider variant='inset' component='li'></Divider>}
            <JobItem job={job} onSelected={onJobSelected}></JobItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};
