import { makeDate } from '$src/utils/common';


export const futureValidator = (value: string): boolean => {
  const today = Date.now();

  if (!value) return true;
  const _value = new Date(value);
  if (!_value || +_value > +today) {
    return true;
  }

  return false;
};

export const pastValidator = (value: string): boolean => {
  const today = Date.now();

  if (!value) return true;
  const _value = new Date(value);

  if (!_value || +_value < +today) {
    return true;
  }
  return false;
};


export const pastValidatorFn = (params: { date: string; }): any => {
  return (value: string): boolean => {
    if (!value) return true;

    const _date = makeDate(params.date);
    if (!_date) return true;

    const _value = new Date(value);
    if (!_value || +_value < +_date) {
      return true;
    }
    return false;
  };
};

export const dateRangeValidatorFn = (params: { minDate?: string, maxDate?: string; }): any => {
  return (value: string): boolean => {
    if (!value) return true;
    // make two dates if one is null, the other takes over, if both null, return null.
    const _min = makeDate(params.minDate);
    const _max = makeDate(params.maxDate);
    if (!_min && !_max) return true;

    // if both exist, range
    // if only one exists, check against that
    const _minDate = _min ? +_min : null;
    const _maxDate = _max ? +_max : null;
    const _value = +(new Date(value));

    // if only min
    const future = _maxDate ? _value < _maxDate : true;
    const past = _value > _minDate;
    if (future && past) {
      return true;
    }
    return false;
  };
};

// validate file size to be what?
export const sizeValidatorFn = (params: { size: number, max: number; }): any => {
  return (value: string): boolean => {
    if (!value) return true;
    // convert max from KB to bytes
    const _max = params.max * 1024;
    if (params.size > _max) {
      return true;
    }

    return false;
  };
};

export const atleastOne = (value: any[]): boolean => {
  if (value?.length) {
    return true;
  }

  return false;
};


export const InputValidators = new Map<string, any>([
  ['future', futureValidator],
  ['past', pastValidator],
  ['pastFn', pastValidatorFn],
  ['dateRangeFn', dateRangeValidatorFn],
  ['sizeFn', sizeValidatorFn],
  ['atleastOne', atleastOne]
]);

