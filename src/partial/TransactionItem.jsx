import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { abbreviation } from '../utils/nameAbbreviation';
import Typography from '@material-ui/core/Typography';

const TransactionItem = ({ transaction, onEdit }) => {
  const { transactionDate, id, amount } = transaction;
  const [checked, setChecked] = React.useState(false);

  return (
    <ListItem key={id} button onClick={() => onEdit(transaction)}>
      <ListItemIcon>
        <Avatar>{abbreviation(firstName, lastName)}</Avatar>
      </ListItemIcon>
      <ListItemText primary={`${firstName} ${lastName}`}></ListItemText>
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
