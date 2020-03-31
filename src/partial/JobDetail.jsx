import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { abbreviation } from '../utils/nameAbbreviation';

const JobDetail = ({ job, onDeselected }) => {
  if (!job) return (<div></div>);

  const {
    customer: { firstName, lastName },
    location: { title, addressOne }
  } = job;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label='client'>
            {abbreviation(firstName, lastName)}
          </Avatar>
        }
        action={
          <IconButton aria-label='close' onClick={() => onDeselected()}>
            <CloseIcon />
          </IconButton>
        }
        title={title}
        subheader={addressOne}
      />
      <CardContent>
        <Typography>Stuff Here</Typography>
      </CardContent>
    </Card>
  );
};

export default JobDetail;
