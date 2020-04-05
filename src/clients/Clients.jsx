import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { ClientItem } from '../partial';
import { publishTo, DATA_KEYS, useClients, NAV_STATES } from '../state';

const useStyles = makeStyles((theme) => ({}));

const Clients = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const clients = useClients();

  publishTo(DATA_KEYS.MEANS_TOOLBAR, {
    title: 'Clients',
    navState: NAV_STATES.MENU,
  });

  publishTo(DATA_KEYS.ACTION_FAB, {
    hide: false,
    onAdd: () => history.push('/clients/create'),
    onDelete: () => onDelete(),
  });

  const onDelete = () => {
    deleteClients(selected).then(() => setSelected([]));
    publishTo(DATA_KEYS.ACTION_FAB, { promptUser: false });
  };

  const onSelected = ({ id }) => {
    const s = [...selected];
    const index = s.findIndex((s) => s == id);
    if (index > -1) s.splice(index, 1);
    else s.push(id);

    if (s.length) publishTo(DATA_KEYS.ACTION_FAB, { promptUser: true });
    else publishTo(DATA_KEYS.ACTION_FAB, { promptUser: false });

    setSelected(s);
  };

  const onEdit = (client) => history.push(`/clients/${client.id}/detail`);

  return (
    <List>
      {clients.map((client, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && <Divider variant='inset' component='li'></Divider>}
            <ClientItem client={client} onEdit={onEdit}></ClientItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Clients;
