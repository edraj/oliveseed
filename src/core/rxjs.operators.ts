import { map, pipe, tap, type MonoTypeOperatorFunction } from 'rxjs';

export const debug = (message: string, type?: string): MonoTypeOperatorFunction<any> => {
  return pipe(
    tap({
      next: (nextValue) => {
        _debug(nextValue, message, type);
      },
    })
  );
};


export const patch = (shortname: string): MonoTypeOperatorFunction<any> => {
  return pipe(
    map(resource => resource || { shortname, displayname: shortname })
  );
};

