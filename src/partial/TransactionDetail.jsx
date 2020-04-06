import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { CurrencyInput } from '../partial';

import {
  publishTo,
  DATA_KEYS,
  NAV_STATES,
  selectTransaction,
  saveTransaction,
} from '../state';

const useStyles = makeStyles((theme) => ({
  cancel: {
    marginLeft: theme.spacing(2),
  },
}));

const TransactionDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const transaction = selectTransaction(id) || { details: {} };
  const [amount, setAmount] = React.useState(transaction.amount);
  const [transactionType, setTransactionType] = React.useState(
    transaction.transactionType
  );
  const [transactionDate, setTransactionDate] = React.useState(
    transaction.transactionDate
  );

  const { details } = transaction;
  const [category, setCategory] = React.useState(details.category);
  const [form, setForm] = React.useState(details.form);
  const [description, setDescription] = React.useState(details.description);
  const [job, setJob] = React.useState(details.job);

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: `Edit Transaction`,
    navState: NAV_STATES.BACK,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: true,
  });

  const onCancel = () => {
    history.goBack();
  };

  const onSave = (id) => {
    const updatedTransaction = {
      amount,
      transactionType,
      transactionDate,
      details: {
        category,
        description,
        form,
        job,
      },
    };

    saveTransaction(updatedTransaction);

    history.goBack();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id={`${id}-Amount`}
              fullWidth
              label='Amount'
              defaultValue={amount}
              InputLabelProps={{ disableAnimation: true }}
              onChange={({ target: { value } }) => setAmount(value)}
              InputProps={{
                inputComponent: (props) => <CurrencyInput {...props} />,
              }}></TextField>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
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
              onClick={() => onSave(transaction.id)}
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
              </Grid>*/}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionDetail;
