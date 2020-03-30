import React, { Component } from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Landing } from '../landing';

const theme = createMuiTheme();

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Landing />
    </ThemeProvider>
  );
};

export default App;
