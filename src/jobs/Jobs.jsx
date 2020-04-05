import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { JobItem } from '../partial';
import { publishTo, DATA_KEYS, NAV_STATES, useJobs, deleteJobs } from '../state';

const useStyles = makeStyles((theme) => ({}));

export default () => {
  const jobs = useJobs();
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = React.useState([]);

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: 'Jobs',
    navState: NAV_STATES.MENU,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: false,
    onAdd: () => history.push('/jobs/create'),
    onDelete: () => onDelete(),
  });

  const onDelete = () => {
    deleteJobs(selected).then(() => setSelected([]));
    publishTo(DATA_KEYS.ACTION_FAB, { promptUser: false });
  };

  const onSelected = ({ id }) => {
    const s = [...selected];
    const index = s.findIndex((s) => s == id);
    if (index > -1) s.splice(index, 1);
    else s.push(id);

    if (s.length) publishTo(DATA_KEYS.ACTION_FAB, { promptUser: true });
    else publishTo(DATA_KEYS.ACTION_FAB, { promptUser: false });

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
