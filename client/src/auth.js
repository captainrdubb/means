import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from './auth-app';

if (Office)
  Office.onReady(() =>
    ReactDOM.render(<Auth />, document.getElementById('root'))
  );
else ReactDOM.render(<Auth />, document.getElementById('root'));
