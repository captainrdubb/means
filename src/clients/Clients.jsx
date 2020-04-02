import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { ClientItem } from '../partial';
import { publishTo, DATA_KEYS, useClients, NAV_STATES } from '../state';

const useStyles = makeStyles((theme) => ({}));

const Clients = (props) => {
  publishTo(DATA_KEYS.APP_BAR, { title: 'Clients', navState: NAV_STATES.MENU });

  const classes = useStyles();
  const history = useHistory();

  const clients = useClients();
  const onClientSelected = (client) =>
    history.push(`/clients/${client.id}/detail`);

  return (
    <List>
      {clients.map((client, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && <Divider variant='inset' component='li'></Divider>}
            <ClientItem job={client} onSelected={onClientSelected}></ClientItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Clients;
