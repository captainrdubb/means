import { BehaviorSubject } from 'rxjs';

//have keys for subscription
//have a subscription method
//have a behavior subject for slice of state
export const keys = {
  APP_BAR_HEADER: 'APP_BAR_HEADER',
  CLIENTS: 'CLIENTS',
  JOBS: 'JOBS'
};

const state = {};

state[keys.APP_BAR_HEADER] = new BehaviorSubject('Means');
state[keys.CLIENTS] = new BehaviorSubject([]);
state[keys.JOBS] = new BehaviorSubject([
  {
    id: 1,
    customer: {
      firstName: 'Bob',
      lastName: 'Vila'
    },
    location: {
      title: 'This Old House',
      addressOne: '21 Jump St.',
      addressTwo: '',
      city: '',
      state: '',
      zip: ''
    }
  },
  {
    id: 2,
    customer: {
      firstName: 'Tim',
      lastName: 'Taylor'
    },
    location: {
      title: 'Tool Time',
      addressOne: '123 Sesame St.',
      addressTwo: '',
      city: '',
      state: '',
      zip: ''
    }
  }
]);

export const publish = (key, data) => {
  state[key].next(data);
};

export const subscribe = (key, callback) => {
  return state[key].subscribe(callback);
};
