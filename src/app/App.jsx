import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Jobs } from '../jobs';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const App = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label='Cash Flow Navigation'>
          <Tab label='Jobs' aria-controls='jobs-tab' />
          <Tab label='Clients' aria-controls='clients-tab' />
        </Tabs>
      </AppBar>
      <Typography
        component='div'
        role='tabpanel'
        hidden={tabIndex !== 0}
        id={`jobs-tab`}
        aria-labelledby={`jobs-tab`}>
        {tabIndex === 0 && <Jobs></Jobs>}
      </Typography>
      <Typography
        component='div'
        role='tabpanel'
        hidden={tabIndex !== 1}
        id={`clients-tab`}
        aria-labelledby={`clients-tab`}>
        {tabIndex === 1 && <Box p={3}>Jobs</Box>}
      </Typography>      
    </div>
  );
};

export default App;
