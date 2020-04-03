import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { abbreviation } from '../utils/nameAbbreviation';
import Typography from '@material-ui/core/Typography';

const ClientItem = ({ client, onSelected }) => {
  const { id, firstName, lastName } = client;

  return (
    <ListItem key={id} button onClick={() => onSelected(client)}>
      <ListItemAvatar>
        <Avatar>{abbreviation(firstName, lastName)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${firstName} ${lastName}`}></ListItemText>
    </ListItem>
  );
};

export default ClientItem;
