import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/Forward';
import { abbreviation } from '../utils/nameAbbreviation';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  in: {
    color: 'rgb(63, 181, 94)',
  },
  out: {
    color: theme.palette.secondary.main,
    transform: 'rotate(-180deg)',
  },
  inline: {
    display: 'inline',
  },
}));

const TransactionItem = ({ transaction, onEdit }) => {
  const classes = useStyles();
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const {
    transactionDate,
    transactionType,
    id,
    amount,
    details: { description },
  } = transaction;
  const [checked, setChecked] = React.useState(false);

  return (
    <ListItem key={id} button onClick={() => onEdit(transaction)}>
      <ListItemIcon>
        {transactionType === 'Payment' ? (
          <ForwardIcon className={classes.in}></ForwardIcon>
        ) : (
          <ForwardIcon className={classes.out}></ForwardIcon>
        )}
      </ListItemIcon>
      <ListItemText
        primary={transactionDate.toLocaleDateString()}
        secondary={
          <React.Fragment>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}>
              {description}&nbsp;{currencyFormat.format(amount)}
            </Typography>
          </React.Fragment>
        }></ListItemText>
      <ListItemSecondaryAction>
        <Checkbox
          checked={checked}
          onChange={({ target: { checked } }) =>
            setChecked(checked)
          }></Checkbox>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TransactionItem;
