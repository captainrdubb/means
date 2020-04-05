import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import sortedIndex from 'lodash.sortedindex';
import sortedIndexOf from 'lodash.sortedindexof';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { TransactionItem } from '../partial';
import {
  publishTo,
  DATA_KEYS,
  NAV_STATES,
  useTransactions,
  deleteTransactions,
} from '../state';

const useStyles = makeStyles((theme) => ({}));

const Expenses = () => {
  const classes = useStyles();
  const history = useHistory();
  const transactions = useTransactions();
  const [selected, setSelected] = React.useState([]);

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: 'Activity',
    navState: NAV_STATES.MENU,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: false,
    onAdd: () => history.push('/transactions/create'),
    onDelete: () => onDelete(),
  });

  const onDelete = () => {
    deleteTransactions(selected).then(() => setSelected([]));
    publishTo(DATA_KEYS.ACTION_FAB, { promptUser: false });
  };

  const isChecked = ({ id }) => {
    return sortedIndexOf(selected, id) > -1;
  };

  const toggleChecked = ({ id }) => {
    let temp = [...selected];

    let indexOf = sortedIndexOf(temp, id);
    let index = null;

    if (indexOf > -1) temp.splice(index, 1);
    else index = sortedIndex(temp, id);

    if (index !== null) temp.splice(index, 0, id);

    if (temp.length) publishTo(DATA_KEYS.ACTION_FAB, { promptUser: true });
    else publishTo(DATA_KEYS.ACTION_FAB, { promptUser: false });

    setSelected(temp);
  };

  return (
    <List>
      {transactions.map((transaction, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && <Divider variant='inset' component='li'></Divider>}
            <TransactionItem
              expense={transaction}
              onEdit={onEdit}
              toggleChecked={toggleChecked}
              checked={isChecked(transaction)}></TransactionItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Expenses;
