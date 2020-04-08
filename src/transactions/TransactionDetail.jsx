import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { CurrencyInput } from '../partial';

import {
  publishTo,
  DATA_KEYS,
  NAV_STATES,
  selectTransaction,
  saveTransaction,
  useJobs,
} from '../state';

const useStyles = makeStyles((theme) => ({
  noMarginTop: {
    marginTop: 0,
  },
  cancel: {
    marginLeft: theme.spacing(2),
  },
}));

const categories = ['Payment', 'Reinvestment', 'Materials', 'Loss'];

const transactionTypes = ['Cash', 'Check', 'Online', 'Asset'];

//move preferred service to customer
//give ability to change service in payment form
const transactionServices = ['PayPal', 'Venmo', 'Apple Pay', 'Square'];

const TransactionDetail = () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const jobs = useJobs();
  let { id } = useParams();

  // TODO CREATE ACCOUNTS SYSTEM
  const transaction = selectTransaction(id) || {};
  const [category, setCategory] = React.useState(transaction.category);
  const [transactionType, setTransactionType] = React.useState(
    transaction.transactionType
  );
  const [transactionDate, setTransactionDate] = React.useState(
    transaction.transactionDate
  );
  const [transactionService, setTransactionService] = React.useState(
    transaction.transactionService
  );
  const [amount, setAmount] = React.useState(transaction.amount);
  const [description, setDescription] = React.useState(transaction.description);
  const [job, setJob] = React.useState(transaction.job);

  const header = pathname.match(/create/i) ? 'Create' : 'Edit';

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: `${header} Transaction`,
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
      id,
      category,
      transactionDate,
      transactionType,
      transactionService,
      amount,
      description,
      job,
    };

    saveTransaction(updatedTransaction);

    history.goBack();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin='normal'
                className={classes.noMarginTop}
                id={`${id}-TransactionDate`}
                label='Transaction Date'
                format='MM/dd/yyyy'
                value={transactionDate}
                onChange={(date, value) => setTransactionDate(value)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id={`${id}-Category`}
              options={categories}
              onChange={(event, value) => setCategory(value)}
              defaultValue={category}
              getOptionLabel={(c) => c}
              renderInput={(params) => (
                <TextField {...params} label='Category' variant='standard' />
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              id={`${id}-TransactionType`}
              options={transactionTypes}
              onChange={(event, value) => setTransactionType(value)}
              defaultValue={transactionType}
              getOptionLabel={(tt) => tt}
              renderInput={(params) => (
                <TextField {...params} label='Type' variant='standard' />
              )}
            />
          </Grid>
          {transactionType === 'Online' && (
            <Grid item sm={6} xs={12}>
              <Autocomplete
                id={`${id}-TransactionService`}
                options={transactionServices}
                onChange={(event, value) => setTransactionService(value)}
                defaultValue={transactionService}
                getOptionLabel={(tt) => tt}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Transaction Service'
                    variant='standard'
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id={`${id}-Amount`}
              label='Amount'
              defaultValue={amount}
              onChange={({ target: { value } }) => setAmount(value)}
              InputProps={{
                inputComponent: CurrencyInput,
              }}></TextField>
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              id={`${id}-Description`}
              label='Description'
              defaultValue={description}
              onChange={({ target: { value } }) => setDescription(value)}
              fullWidth
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              id={`${id}-Job`}
              options={jobs}
              onChange={(event, value) => setJob(value)}
              defaultValue={job}
              getOptionLabel={(j) => j.title}
              renderInput={(params) => (
                <TextField {...params} label='Job' variant='standard' />
              )}
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionDetail;
