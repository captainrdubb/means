import React from 'react';
import ReactDOM from 'react-dom';
import { SignIn } from './sign-in';

if (Office)
  Office.onReady(() =>
    ReactDOM.render(<SignIn />, document.getElementById('root'))
  );
else ReactDOM.render(<SignIn />, document.getElementById('root'));
