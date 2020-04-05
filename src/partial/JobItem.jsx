import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { abbreviation } from '../utils/nameAbbreviation';

const JobListItem = ({ job, onEdit, checked, toggleChecked }) => {
  const { title, client, location } = job;

  return (
    <ListItem key={job.id} button onClick={() => onEdit(job)}>
      <ListItemAvatar>
        <Avatar>{abbreviation(client.firstName, client.lastName)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography>{location.addressOne}</Typography>
        }></ListItemText>
      <ListItemSecondaryAction>
        <Checkbox
          checked={checked}
          onChange={() => toggleChecked(job)}></Checkbox>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default JobListItem;
