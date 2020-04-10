import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import sortedIndex from 'lodash.sortedindex';
import sortedIndexOf from 'lodash.sortedindexof';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { ClientItem } from '../partial';
import {
  publishTo,
  DATA_KEYS,
  useClients,
  NAV_STATES,
  deleteClients,
} from '../state';

const useStyles = makeStyles((theme) => ({}));

const Clients = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const clients = useClients();
  const [selected, setSelected] = React.useState([]);

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: 'Clients',
    navState: NAV_STATES.MENU,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: false,
    onAdd: () => history.push('/clients/create'),
    onDelete: () => onDelete(),
    onExport: null,
  });

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

  const onDelete = () => {
    deleteClients(selected).then(() => setSelected([]));
    publishTo(DATA_KEYS.ACTION_FAB, { promptUser: false });
  };

  const onEdit = (client) => history.push(`/clients/${client.id}/edit`);

  return (
    <List>
      {clients.map((client, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && <Divider variant='inset' component='li'></Divider>}
            <ClientItem
              client={client}
              onEdit={onEdit}
              checked={isChecked(client)}
              toggleChecked={toggleChecked}></ClientItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Clients;
