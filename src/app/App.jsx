import React, { Component } from 'react';
import { Landing } from '../Landing';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme();

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Landing />
    </ThemeProvider>
  );
};

export default App;
