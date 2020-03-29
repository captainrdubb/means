import React, { Component } from './node_modules/react';
import { Landing } from '../landing';
import ThemeProvider from './node_modules/@material-ui/styles/ThemeProvider';
import createMuiTheme from './node_modules/@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme();

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Landing />
    </ThemeProvider>
  );
};

export default App;
