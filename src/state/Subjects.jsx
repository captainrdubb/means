import { BehaviorSubject } from 'rxjs';

//have keys for subscription
//have a subscription method
//have a behavior subject for slice of state
export const keys = {
  APP_BAR_HEADER: 'APP_BAR_HEADER'
};

const state = {};

state[keys.APP_BAR_HEADER] = new BehaviorSubject('Means');

export const publish = (key, data) => {
  state[key].next(data);
};

export const subscribe = (key, callback) => {
  return state[key].subscribe(callback);
};
