import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, Redirect } from 'react-router';
import { MemoryRouter as Router } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

const Routing = () => {
  return (
    <Router basename='/auth'>
      <Container fixed>
        <CssBaseline />
        <main>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/signin' />
            </Route>
            <Route exact path='/signin'>
              <SignIn />
            </Route>
            <Route exact path='/signup'>
              <SignUp />
            </Route>
          </Switch>
        </main>
      </Container>
    </Router>
  );
};

export default Routing;
