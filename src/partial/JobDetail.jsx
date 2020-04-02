import React from 'react';
import { useParams } from 'react-router-dom';
import Build from '@material-ui/icons/Build';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { abbreviation } from '../utils/nameAbbreviation';
import {
  publishTo,
  DATA_KEYS,
  NAV_STATES,
  useClients,
  selectJob
} from '../state';

const useStyles = makeStyles((theme) => ({
  client: {
    width: 250
  }
}));

const JobDetail = () => {
  const classes = useStyles();
  const clients = useClients();
  const { id } = useParams();
  const [jobForm, setJobForm] = React.useState({ ...selectJob(id) });

  publishTo(DATA_KEYS.APP_BAR, {
    title: `Job - ${'Title'}`,
    navState: NAV_STATES.BACK
  });

  const onClientChange = (client, reason) => {
    switch (reason) {
      case 'select-option':
        setJobForm({ ...jobForm, client });
      case 'remove-option':
        setJobForm({ ...jobForm, client });
    }
  };

  return (
    <Grid container spacing={1} justify='center' direction='column'>
      <Grid item>
        <TextField id='' label='Title' value={jobForm.title} />
      </Grid>
      <Grid item>
        <Autocomplete
          id=''
          options={clients}
          onChange={onClientChange}
          className={classes.client}
          defaultValue={jobForm.client}
          getOptionLabel={(client) => `${client.firstName} ${client.lastName}`}
          renderInput={(params) => (
            <TextField {...params} label='Client' variant='standard' />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default JobDetail;
