import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

export const registerAuthUser = (authUser) => {
  const observable = ajax({
    url: `/auth/signup`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: authUser,
  }).pipe(
    map((response) => console.log(response)),
    catchError((error) => console.log(error))
  );
  observable.subscribe((result) => console.log(result));
};
