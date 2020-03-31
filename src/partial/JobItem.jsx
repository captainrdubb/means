import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { abbreviation } from '../utils/nameAbbreviation';
import Typography from '@material-ui/core/Typography';

const JobListItem = ({ job, onSelected }) => {
  const { customer, location } = job;

  return (
    <ListItem key={job.id} button onClick={() => onSelected(job)}>
      <ListItemAvatar>
        <Avatar>{abbreviation(customer.firstName, customer.lastName)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={location.title}
        secondary={
          <Typography>{location.addressOne}</Typography>
        }></ListItemText>
    </ListItem>
  );
};

export default JobListItem;
