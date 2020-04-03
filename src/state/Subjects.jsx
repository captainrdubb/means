import { BehaviorSubject } from 'rxjs';

//have keys for subscription
//have a subscription method
//have a behavior subject for slice of state
export const keys = {
  APP_BAR: 'APP_BAR',
  CLIENTS: 'CLIENTS',
  JOBS: 'JOBS',
  ACTION_BAR: 'ACTION_BAR',
};

export const appBarNav = {
  MENU: 'MENU',
  BACK: 'BACK',
};

export const state = {};

// UI STATE
state[keys.APP_BAR] = new BehaviorSubject({
  title: 'Means',
  navState: appBarNav.MENU,
  actionBar: {
    onAdd: null,
    onDelete: null,
    enableAdd: true,
    enableDelete: true,
    enableReset: true,
  },
});

state[keys.ACTION_BAR] = new BehaviorSubject({
  onAdd: null,
  onDelete: null,
  enableAdd: true,
  enableDelete: false,
  enableReset: false,
});

// DATA STATE
state[keys.CLIENTS] = new BehaviorSubject([
  {
    id: 1,
    firstName: 'Bob',
    lastName: 'Vila',
    location: {
      addressOne: '21 Jump St.',
      addressTwo: '',
      city: '',
      state: '',
      zip: '',
    },
  },
  {
    id: 2,
    firstName: 'Tim',
    lastName: 'Taylor',
    location: {
      addressOne: '21 Jump St.',
      addressTwo: '',
      city: '',
      state: '',
      zip: '',
    },
  },
]);

state[keys.JOBS] = new BehaviorSubject([
  {
    id: 1,
    title: 'This Old House',
    client: {
      firstName: 'Bob',
      lastName: 'Vila',
    },
    location: {
      addressOne: '21 Jump St.',
      addressTwo: '',
      city: '',
      state: '',
      zip: '',
    },
  },
  {
    id: 2,
    title: 'Tool Time',
    client: {
      firstName: 'Tim',
      lastName: 'Taylor',
    },
    location: {
      addressOne: '123 Sesame St.',
      addressTwo: '',
      city: '',
      state: '',
      zip: '',
    },
  },
]);

export const publish = (key, data) => {
  state[key].next(data);
};

export const subscribe = (key, callback) => {
  return state[key].subscribe(callback);
};
