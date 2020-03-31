import { publish, subscribe, keys } from './subjects';

export default {
  publishTo: publish,
  subscribeTo: subscribe,
  DATA_KEYS: keys
};
