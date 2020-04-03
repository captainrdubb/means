import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { publishTo, DATA_KEYS, NAV_STATES, selectClient } from '../state';

const useStyles = makeStyles((theme) => ({
  cancel: {
    marginLeft: theme.spacing(2),
  },
}));

const ClientDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [clientForm, setClientForm] = React.useState({ ...selectClient(id) });

  publishTo(DATA_KEYS.APP_BAR, {
    title: `Edit Client`,
    navState: NAV_STATES.BACK,
  });

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id=''
              label='Description'
              value={clientForm.firstName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id=''
              label='Description'
              value={clientForm.lastName}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}
          <Grid item xs={12}>
            <TextField
              id=''
              label='Address line 1'
              autoComplete='address-line1'
              value={clientForm.location.addressOne}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id=''
              label='Address line 2'
              autoComplete='address-line2'
              value={clientForm.location.addressTwo}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id=''
              label='City'
              autoComplete='address-level2'
              value={clientForm.location.city}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id=''
              label='State'
              autoComplete='address-level1'
              value={clientForm.location.state}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id=''
              label='Zip'
              autoComplete='postal-code'
              value={clientForm.location.zip}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary'>
              Save
            </Button>
            <Button
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
