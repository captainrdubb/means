import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { abbreviation } from '../utils/nameAbbreviation';
import Typography from '@material-ui/core/Typography';

const JobListItem = ({ job, onSelected }) => {
  const { title, client, location } = job;

  return (
    <ListItem key={job.id} button onClick={() => onSelected(job)}>
      <ListItemAvatar>
        <Avatar>{abbreviation(client.firstName, client.lastName)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography>{location.addressOne}</Typography>
        }></ListItemText>
    </ListItem>
  );
};

export default JobListItem;
