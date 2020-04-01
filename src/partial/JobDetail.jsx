import React from 'react';
import Build from '@material-ui/icons/Build';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { abbreviation } from '../utils/nameAbbreviation';
import { Grid, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { publishTo, DATA_KEYS, useJobs } from '../state';

const JobDetail = () => {
  const jobs = useJobs();
  const params = useParams();
  console.log(params);
  const [job, setJob] = React.useState();
  publishTo(DATA_KEYS.APP_BAR_HEADER, `Job - ${'Title'}`);

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item>
        <TextField id='' label='Job Title' />
      </Grid>
    </Grid>
  );
};

export default JobDetail;
