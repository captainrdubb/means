import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { abbreviation } from '../utils/nameAbbreviation';
import Typography from '@material-ui/core/Typography';

const JobListItem = ({ job, onEdit, onSelected }) => {
  const { title, client, location } = job;

  const [selected, setSelected] = React.useState(false);

  const toggleSelected = (job) => {
    setSelected(!selected);
    onSelected(job);
  };

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
        <Checkbox onChange={() => toggleSelected(job)} checked={selected} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default JobListItem;
