import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  publishTo,
  DATA_KEYS,
  NAV_STATES,
  selectClient,
  saveClient,
} from '../state';

const useStyles = makeStyles((theme) => ({
  cancel: {
    marginLeft: theme.spacing(2),
  },
}));

const ClientDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const client = selectClient(id) || { location: {} };
  const [firstName, setFirstName] = React.useState(client.firstName);
  const [lastName, setLastName] = React.useState(client.lastName);

  const { location } = client;
  const [addressOne, setAddressOne] = React.useState(location.addressOne);
  const [addressTwo, setAddressTwo] = React.useState(location.addressTwo);
  const [city, setCity] = React.useState(location.city);
  const [state, setState] = React.useState(location.state);
  const [zip, setZip] = React.useState(location.zip);

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: `Edit Client`,
    navState: NAV_STATES.BACK,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: true,
  });

  const onSave = (id) => {
    const updatedClient = {
      id,
      firstName,
      lastName,
      location: {
        addressOne,
        addressTwo,
        city,
        state,
        zip,
      },
    };
    saveClient(updatedClient);
    history.push('/clients');
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id=''
              label='First Name'
              defaultValue={firstName}
              onChange={({ target: { value } }) => setFirstName(value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id=''
              label='Last Name'
              defaultValue={lastName}
              onChange={({ target: { value } }) => setLastName(value)}
              fullWidth
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
              defaultValue={state}
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
              onClick={() => onSave(client.id)}
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

export default ClientDetail;
