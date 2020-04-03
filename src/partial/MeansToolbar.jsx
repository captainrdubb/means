import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { DATA_KEYS, NAV_STATES, subscribeTo } from '../state';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const MeansToolbar = ({ onMenuClick, onNavBack }) => {
  const classes = useStyles();

  const [appBarState, setAppBarState] = React.useState({
    title: '',
    navState: '',
  });

  React.useEffect(() => {
    const subscription = subscribeTo(DATA_KEYS.APP_BAR, setAppBarState);
    return () => subscription.unsubscribe();
  }, []);

  const getNavIcon = () => {
    const isMenu = appBarState.navState === NAV_STATES.MENU;
    if (isMenu) return <MenuIcon></MenuIcon>;
    return <ChevronLeftIcon />;
  };

  const getTitle = () => {
    if (!appBarState) return 'Means';
    return appBarState.title;
  };
  const onClick = () => {
    const isNavBack = appBarState.navState === NAV_STATES.BACK;
    if (isNavBack) onNavBack();
    else onMenuClick();
  };

  return (
    <Toolbar>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={onClick}
        edge='start'
        className={classes.menuButton}>
        {getNavIcon()}
      </IconButton>
      <Typography variant='h6' noWrap>
        {getTitle()}
      </Typography>
    </Toolbar>
  );
};

export default MeansToolbar;
