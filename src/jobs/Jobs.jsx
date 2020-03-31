import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import appState from '../state';
import { JobItem, JobDetail } from '../partial';

const useStyles = makeStyles((theme) => ({}));

export default (props) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState();
  const [listHidden, setListHidden] = React.useState();
  appState.publishTo(appState.DATA_KEYS.APP_BAR_HEADER, 'Jobs');

  const jobs = [
    {
      id: 1,
      customer: {
        firstName: 'Bob',
        lastName: 'Vila'
      },
      location: {
        title: 'This Old House',
        addressOne: '21 Jump St.',
        addressTwo: '',
        city: '',
        state: '',
        zip: ''
      }
    },
    {
      id: 2,
      customer: {
        firstName: 'Tim',
        lastName: 'Taylor'
      },
      location: {
        title: 'Tool Time',
        addressOne: '123 Sesame St.',
        addressTwo: '',
        city: '',
        state: '',
        zip: ''
      }
    }
  ];
  return (
    <>
      <Zoom in={selected == undefined} onExit={() => setListHidden(true)} appear={false}>
        <List hidden={listHidden}>
          {jobs.map((job, index) => {
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Divider variant='inset' component='li'></Divider>
                )}
                <JobItem job={job} onSelected={setSelected}></JobItem>
              </React.Fragment>
            );
          })}
        </List>
      </Zoom>
      <Zoom in={selected != undefined} onExited={() => setListHidden(false)}>
        <JobDetail job={selected} onDeselected={setSelected}></JobDetail>
      </Zoom>
    </>
  );
};
