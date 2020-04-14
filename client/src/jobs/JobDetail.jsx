import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
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
  saveJob,
} from '../state';

const useStyles = makeStyles((theme) => ({
  cancel: {
    marginLeft: theme.spacing(2),
  },
}));

const JobDetail = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const clients = useClients();
  const { id } = useParams();

  const job = selectJob(id) || { location: {} };
  const [title, setTitle] = React.useState(job.title);
  const [client, setClient] = React.useState(job.client);
  const [addressOne, setAddressOne] = React.useState(job.location.addressOne);
  const [addressTwo, setAddressTwo] = React.useState(job.location.addressTwo);
  const [city, setCity] = React.useState(job.location.city);
  const [_state, setState] = React.useState(job.location.city);
  const [zip, setZip] = React.useState(job.location.zip);

  const header = pathname.match(/create/i) ? 'Create' : 'Edit';

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: `${header} Job`,
    navState: NAV_STATES.BACK,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: true,
  });

  const onCancel = () => {
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

  const onSave = (id) => {
    const updatedJob = {
      id,
      title,
      client,
      location: {
        addressOne,
        addressTwo,
        city,
        state: _state,
        zip,
      },
    };

    saveJob(updatedJob);
    history.goBack();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id=''
              label='Description'
              defaultValue={title}
              onChange={({ target: { value } }) => setTitle(value)}
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
              defaultValue={client}
              onChange={(event, value) => setClient(value)}
              getOptionLabel={(c) => `${c.firstName} ${c.lastName}`}
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
              defaultValue={addressOne}
              onChange={({ target: { value } }) => setAddressOne(value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id=''
              label='Address line 2'
              autoComplete='address-line2'
              defaultValue={addressTwo}
              onChange={({ target: { value } }) => setAddressTwo(value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id=''
              label='City'
              autoComplete='address-level2'
              defaultValue={city}
              onChange={({ target: { value } }) => setCity(value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id=''
              label='State'
              autoComplete='address-level1'
              defaultValue={_state}
              onChange={({ target: { value } }) => setState(value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id=''
              label='Zip'
              autoComplete='postal-code'
              defaultValue={zip}
              onChange={({ target: { value } }) => setZip(value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => onSave(job.id)}
              variant='contained'
              color='primary'>
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
