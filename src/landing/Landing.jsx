import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Build from '@material-ui/icons/Build';
import Person from '@material-ui/icons/Person';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Route, Switch, Redirect } from 'react-router';
import { Jobs } from '../jobs';
import appData from '../state';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    }
  },
  contentShift: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  }
}));

const Landing = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const isAlwaysOpen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  React.useEffect(() => setOpen(isAlwaysOpen), [isAlwaysOpen]);

  const [headerText, setHeaderText] = React.useState('Means');

  React.useEffect(() => {
    const { DATA_KEYS } = appData;
    const subscription = appData.subscribeTo(
      DATA_KEYS.APP_BAR_HEADER,
      setHeaderText
    );
    return () => subscription.unsubscribe();
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            {headerText}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        onClick={() => (isAlwaysOpen ? '' : toggleDrawer())}
        className={classes.drawer}
        variant={isAlwaysOpen ? 'persistent' : 'temporary'}
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}>
        <div className={classes.drawerHeader}>
          {!isAlwaysOpen && (
            <IconButton onClick={toggleDrawer}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          )}
        </div>
        <Divider />
        <List>
          {['Jobs', 'Person'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <Build></Build> : <Person></Person>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}>
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/jobs' />
          </Route>
          <Route exact path='/jobs'>
            <Jobs></Jobs>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default Landing;
