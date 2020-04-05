import { BehaviorSubject } from 'rxjs';

//have keys for subscription
//have a subscription method
//have a behavior subject for slice of state
export const keys = {
  MEANS_TOOLBAR: 'APP_BAR',
  CLIENTS: 'CLIENTS',
  JOBS: 'JOBS',
  ACTION_FAB: 'ACTION_FAB',
  ACTIVITY: 'ACTIVITY',
};

export const appBarNav = {
  MENU: 'MENU',
  BACK: 'BACK',
};

export const state = {};

// UI STATE
state[keys.MEANS_TOOLBAR] = new BehaviorSubject({
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

state[keys.ACTION_FAB] = new BehaviorSubject({
  hide: false,
  onAdd: null,
  onDelete: null,
  promptUser: false,
});

// DATA STATE
state[keys.ACTIVITY] = new BehaviorSubject([
  {
    id: 1,
    transactionType: 'Payment',
    transactionDate: new Date(),
    amount: 20.0,
    details: {
      category: 'A',
      form: 'Cash',
      description: 'payment',
      job: {
        id: 2,
        title: 'Tool Time',
      },
    },
  },
  {
    id: 2,
    transactionType: 'Reinvestment',
    transactionDate: new Date(),
    amount: 250.0,
    details: {
      category: 'B',
      form: 'PayPal',
      job: null,
      description: 'table saw',
      to: 'Bill Bowers',
    },
  },
]);

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
  let s = state[key].getValue();
  if (Array.isArray(s)) state[key].next(data);
  else state[key].next({ ...s, ...data });
};

export const subscribe = (key, callback) => {
  return state[key].subscribe(callback);
};
