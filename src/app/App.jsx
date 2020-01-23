import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
          <Tab label='Cash' aria-controls='cash-tab' />
          <Tab label='Jobs' aria-controls='jobs-tab' />
          <Tab label='Customers' aria-controls='customers tab' />
        </Tabs>
      </AppBar>
      <Typography
        component='div'
        role='tabpanel'
        hidden={tabIndex !== 0}
        id={`cash-tab`}
        aria-labelledby={`cash-tab`}>
        {tabIndex === 0 && <Box p={3}><h1>Cash</h1></Box>}
      </Typography>
      <Typography
        component='div'
        role='tabpanel'
        hidden={tabIndex !== 1}
        id={`jobs-tab`}
        aria-labelledby={`jobs-tab`}>
        {tabIndex === 1 && <Box p={3}><h1>Jobs</h1></Box>}
      </Typography>
      <Typography
        component='div'
        role='tabpanel'
        hidden={tabIndex !== 2}
        id={`customers-tab`}
        aria-labelledby={`customers-tab`}>
        {tabIndex === 2 && <Box p={3}><h1>Customers</h1></Box>}
      </Typography>
    </div>
  );
};

export default App;
