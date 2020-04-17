import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import sortedIndex from 'lodash.sortedindex';
import sortedIndexOf from 'lodash.sortedindexof';

import { JobItem } from '../partial';
import {
  publishTo,
  DATA_KEYS,
  NAV_STATES,
  useJobs,
  deleteJobs,
  mergeTo,
} from '../state';

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
    onExport: null,
  });

  const onDelete = () => {
    deleteJobs(selected).then(() => setSelected([]));
    mergeTo(DATA_KEYS.ACTION_FAB, { promptUser: false });
  };

  const isChecked = ({ id }) => {
    return sortedIndexOf(selected, id) > -1;
  };

  const toggleChecked = ({ id }) => {
    let temp = [...selected];

    let indexOf = sortedIndexOf(temp, id);
    let index = null;

    if (indexOf > -1) temp.splice(index, 1);
    else index = sortedIndex(temp, id);

    if (index !== null) temp.splice(index, 0, id);

    if (temp.length) mergeTo(DATA_KEYS.ACTION_FAB, { promptUser: true });
    else mergeTo(DATA_KEYS.ACTION_FAB, { promptUser: false });

    setSelected(temp);
  };

  const onEdit = (job) => history.push(`/jobs/${job.id}/edit`);

  return (
    <List>
      {jobs.map((job, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && <Divider variant='inset' component='li'></Divider>}
            <JobItem
              job={job}
              onEdit={onEdit}
              toggleChecked={toggleChecked}
              checked={isChecked(job)}></JobItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};
