import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import {
  publishTo,
  DATA_KEYS,
  NAV_STATES,
  useClients,
  selectJob,
} from '../state';

const useStyles = makeStyles((theme) => ({
  cancel: {
    marginLeft: theme.spacing(2),
  },
}));

const JobDetail = () => {
  const classes = useStyles();
  const clients = useClients();
  const history = useHistory();
  const { id } = useParams();
  const [jobForm, setJobForm] = React.useState({ ...selectJob(id) });

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: `Edit Job`,
    navState: NAV_STATES.BACK,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: true,
  });

  const onCancel = () => {
    publishTo(DATA_KEYS.ACTION_FAB, {
      hide: false,
    });
    history.goBack();
  };

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
      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
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
          <Grid item xs={12}>
            <Button variant='contained' color='primary'>
              Save
            </Button>
            <Button
              onClick={onCancel}
              variant='contained'
              color='secondary'
              className={classes.cancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JobDetail;
