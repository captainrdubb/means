import React from 'react';
import Observable from 'rxjs/Observable';

const useObservable = (observable) => {
  const [state, setState] = React.useState();
  React.useEffect(() => {
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [state]);
  return state;
};
