import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { DATA_KEYS, subscribeTo } from '../state';

const useStyles = makeStyles((theme) => ({
  prompt: {
    border: `2.75px solid ${theme.palette.secondary.main}`,
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <AddIcon />, name: 'Add', fnKey: 'onAdd' },
  { icon: <DeleteIcon />, name: 'Remove', fnKey: 'onDelete' },
  { icon: <AssessmentIcon />, name: 'Report', fnKey: 'onExport' },
];

const MainActions = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fabState, setFabState] = React.useState({});

  React.useEffect(() => {
    const subscription = subscribeTo(DATA_KEYS.ACTION_FAB, setFabState);
    return () => subscription.unsubscribe();
  }, []);

  const onActionClick = (action) => {
    fabState[action.fnKey]();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      FabProps={{
        classes: { root: clsx({ [classes.prompt]: fabState.promptUser }) },
      }}
      ariaLabel='SpeedDial example'
      className={classes.speedDial}
      hidden={fabState.hide}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction='up'>
      {actions
        .filter((action) => fabState[action.fnKey])
        .map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => onActionClick(action)}
          />
        ))}
    </SpeedDial>
  );
};

export default MainActions;
