import React from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Build from '@material-ui/icons/Build';
import Face from '@material-ui/icons/Face';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Drawer from '@material-ui/core/Drawer';

import { Jobs, JobDetail } from '../jobs';
import { Clients, ClientDetail } from '../clients';
import { Transactions, TransactionDetail } from '../transactions';
import { MeansToolbar, MainActions } from '../partial';
import { Login } from '../login';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const links = [
  {
    title: 'Activity',
    url: '/activity',
    icon: <MonetizationOnIcon></MonetizationOnIcon>,
  },
  {
    title: 'Jobs',
    url: '/jobs',
    icon: <Build></Build>,
  },
  {
    title: 'Clients',
    url: '/clients',
    icon: <Face></Face>,
  },
];

const Landing = () => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const onItemClick = (url) => history.push(url);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <MeansToolbar onMenuClick={toggleDrawer} onNavBack={navBack} />
      </AppBar>
      <Drawer
        onClick={toggleDrawer}
        className={classes.drawer}
        variant='temporary'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {links.map(({ title, url, icon }, index) => (
            <ListItem button key={title} onClick={() => onItemClick(url)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/activity' />
          </Route>
          <Route exact path='/activity'>
            <Transactions></Transactions>
          </Route>
          <Route exact path='/activity/create'>
            <TransactionDetail></TransactionDetail>
          </Route>
          <Route exact path='/activity/:id/edit'>
            <TransactionDetail></TransactionDetail>
          </Route>
          <Route exact path='/clients'>
            <Clients></Clients>
          </Route>
          <Route exact path='/clients/create'>
            <ClientDetail></ClientDetail>
          </Route>
          <Route exact path='/clients/:id/edit'>
            <ClientDetail></ClientDetail>
          </Route>
          <Route exact path='/jobs'>
            <Jobs></Jobs>
          </Route>
          <Route exact path='/jobs/create'>
            <JobDetail></JobDetail>
          </Route>
          <Route exact path='/jobs/:id/edit'>
            <JobDetail></JobDetail>
          </Route>          
        </Switch>
      </main>
      <MainActions />
    </div>
  );
};

export default Landing;
