import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

if (Office) Office.onReady(() => ReactDOM.render(<App />, document.getElementById('root')));
else ReactDOM.render(<App />, document.getElementById('root'));
