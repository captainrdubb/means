import { BehaviorSubject } from 'rxjs';

//have keys for subscription
//have a subscription method
//have a behavior subject for slice of state
export const keys = {
  MEANS_TOOLBAR: 'APP_BAR',
  CLIENTS: 'CLIENTS',
  JOBS: 'JOBS',
  ACTION_FAB: 'ACTION_FAB',
  TRANSACTIONS: 'TRANSACTIONS',
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
state[keys.TRANSACTIONS] = new BehaviorSubject([
  {
    id: 1,
    category: 'Payment',
    transactionType: 'Cash',
    transactionDate: '04/08/2020',
    amount: 20.0,
    description: null,
    job: {
      id: 2,
      title: 'Tool Time',
    },
  },
  {
    id: 2,
    category: 'Reinvestment',
    transactionDate: '04/08/2020',
    transactionType: 'Online',
    transactionService: 'PayPal',
    amount: 250.0,
    account: 'B',
    description: 'table saw',
    job: null,
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
