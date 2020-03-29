import React from './node_modules/react';
import { makeStyles } from './node_modules/@material-ui/core/styles';
import List from './node_modules/@material-ui/core/List';
import ListItem from './node_modules/@material-ui/core/ListItem';
import Divider from './node_modules/@material-ui/core/Divider';
import ListItemText from './node_modules/@material-ui/core/ListItemText';
import ListItemAvatar from './node_modules/@material-ui/core/ListItemAvatar';
import Avatar from './node_modules/@material-ui/core/Avatar';
import Typography from './node_modules/@material-ui/core/Typography';
import Card from './node_modules/@material-ui/core/Card';
import CardContent from './node_modules/@material-ui/core/CardContent';
import CardHeader from './node_modules/@material-ui/core/CardHeader';
import Zoom from './node_modules/@material-ui/core/Zoom';
import CloseIcon from './node_modules/@material-ui/icons/Close';
import IconButton from './node_modules/@material-ui/core/IconButton';

const userStyles = makeStyles((theme) => ({}));

export default (props) => {
  const classes = userStyles();
  const [selected, setSelected] = React.useState();
  const [listHidden, setListHidden] = React.useState();

  return (
    <>
      <Zoom in={!selected} onExit={() => setListHidden(true)} appear={false}>
        <List hidden={listHidden}>
          <ListItem button onClick={() => setSelected(true)}>
            <ListItemAvatar>
              <Avatar>BV</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='This Old House'
              secondary={<Typography>21 Jump St.</Typography>}></ListItemText>
          </ListItem>
          <Divider variant='inset' component='li'></Divider>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>TT</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Tool Time'
              secondary={<Typography>Sesame St.</Typography>}></ListItemText>
          </ListItem>
        </List>
      </Zoom>
      <Zoom in={selected} onExited={() => setListHidden(false)}>
        <Card>
          <CardHeader
            avatar={<Avatar aria-label='client'>BV</Avatar>}
            action={
              <IconButton aria-label='close' onClick={() => setSelected(false)}>
                <CloseIcon />
              </IconButton>
            }
            title='This Old House'
            subheader='21 Jump St'
          />
          <CardContent>
            <Typography>Stuff Here</Typography>
          </CardContent>
        </Card>
      </Zoom>
    </>
  );
};
