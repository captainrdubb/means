import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { JobItem } from '../partial';
import { publishTo, DATA_KEYS, NAV_STATES, useJobs } from '../state';

const useStyles = makeStyles((theme) => ({}));

export default () => {
  const jobs = useJobs();
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = React.useState([]);

  publishTo(DATA_KEYS.APP_BAR, { title: 'Jobs', navState: NAV_STATES.MENU });

  const onSelected = ({ id }) => {
    const s = [...selected];
    const index = s.findIndex((s) => s == id);
    if (index < 0) s.splice(index, 1);
    else s.push(id);
    setSelected(s);
  };

  const onEdit = (job) => history.push(`/jobs/${job.id}/detail`);

  return (
    <List>
      {jobs.map((job, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && <Divider variant='inset' component='li'></Divider>}
            <JobItem
              job={job}
              onEdit={onEdit}
              onSelected={onSelected}></JobItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};
