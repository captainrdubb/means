import { BehaviorSubject } from 'rxjs';
import { getAuthUser } from './apiClient';

//have keys for subscription
//have a subscription method
//have a behavior subject for slice of state
export const keys = {
  MEANS_TOOLBAR: 'APP_BAR',
  CLIENTS: 'CLIENTS',
  JOBS: 'JOBS',
  ACTION_FAB: 'ACTION_FAB',
  TRANSACTIONS: 'TRANSACTIONS',
  USER: 'USER',
};

const api = {
  [keys.USER]: { get: getAuthUser },
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
  onExport: null,
  promptUser: false,
});

// DATA STATE
state[keys.USER] = new BehaviorSubject(null);

state[keys.TRANSACTIONS] = new BehaviorSubject([
  {
    id: 1,
    category: 'Payment',
    transactionDate: '04/08/2020',
    transactionType: 'Cash',
    transactionService: null,
    amount: 20.0,
    description: null,
    job: {
      id: 2,
      title: 'Tool Time',
      client: {
        firstName: 'Bob',
        lastName: 'Vila',
      },
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

export const merge = (key, data) => {
  let observable = state[key];
  let s = observable.getValue();
  if (Array.isArray(s)) observable.next([...s, ...data]);
  else observable.next({ ...s, ...data });
};

export const publish = (key, data) => {
  state[key].next(data);
};

export const subscribe = (key, callback, requestWhenNull) => {
  const observable = state[key];
  if (requestWhenNull && !observable.getValue()) {
    api[key].get().subscribe((user) => observable.next(user));
  }
  return observable.subscribe(callback);
};
