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

const useStyles = makeStyles((theme) => ({}));

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
    <Grid container>
      <Grid container spacing={3} xs={12} md={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            id=''
            label='Description'
            value={jobForm.title}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id=''
            fullWidth
            options={clients}
            onChange={onClientChange}
            className={classes.client}
            defaultValue={jobForm.client}
            getOptionLabel={(client) =>
              `${client.firstName} ${client.lastName}`
            }
            renderInput={(params) => (
              <TextField {...params} label='Client' variant='standard' />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id=''
            label='Address line 1'
            autoComplete='address-line1'
            value={jobForm.location.addressOne}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id=''
            label='Address line 2'
            autoComplete='address-line2'
            value={jobForm.location.addressTwo}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id=''
            label='City'
            autoComplete='address-level2'
            value={jobForm.location.city}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id=''
            label='State'
            autoComplete='address-level1'
            value={jobForm.location.state}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id=''
            label='Zip'
            autoComplete='postal-code'
            value={jobForm.location.zip}
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JobDetail;
