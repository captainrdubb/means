import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { config } from '../config';

export const getAuthUser = () => {
  return ajax(`${config.apiUrl}/me`).pipe(
    map((user) => user),
    catchError((error) => {
      console.error(error);
      return of(null);
    })
  );
};
