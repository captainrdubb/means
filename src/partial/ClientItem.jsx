import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { abbreviation } from '../utils/nameAbbreviation';
import Typography from '@material-ui/core/Typography';

const ClientItem = ({ client, onEdit }) => {
  const { id, firstName, lastName } = client;
  const [checked, setChecked] = React.useState(false);

  return (
    <ListItem key={id} button onClick={() => onEdit(client)}>
      <ListItemAvatar>
        <Avatar>{abbreviation(firstName, lastName)}</Avatar>
      </ListItemAvatar>
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

export default ClientItem;
