import { makeDate, toISODateString } from '$src/utils/common';
import { Res } from '$utils/resources';

export const displayDate = (date: Date | null, withTime = false): string | null => {
  if (!date) { return null; }
  // why DE because it uses a right date seq
  if (withTime) { return date.toLocaleString(Res.language + '-DE'); }
  return date.toLocaleDateString(Res.language + '-DE');
};

export const displayTime = (time: string | null): string | null => {
  // turn the time into local time
  return time;
};

export const displayAsDate = (date: string | null, withTime = false): string | null => {
  const _date = makeDate(date);
  return _date ? displayDate(_date, withTime) : null;
};

// for printing, yyyy-mm-dd HH:mm:ss
export const toVoucherDate = (date: string, withTime = false): string => {
  const _date = makeDate(date);
  if (!_date) return null;

  const _ret = toISODateString(_date);
  if (!withTime) return _ret;

  return _ret + ' ' + Intl.DateTimeFormat('en', {
    timeStyle: "medium",
    hour12: false
  }).format(_date);
};

export const asRelativeTime = (date: string | null): string | null => {
  const _date = makeDate(date);
  return _date ? relativeTime(_date, false, true) : null;
};


export const relativeTime = (date: Date | null, future: boolean = false, decide: boolean = false): string | null => {


  if (!date) return null;
  const current = Date.now();
  const input = date.valueOf();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  // if decision is mine, decide future or past
  const elapsed = Math.abs(input - current);
  if (decide) {
    future = input > current;
  }

  const fallBack = date.toString();

  let relTime = Res.Plural('YEARS', Math.round(elapsed / msPerYear), fallBack);
  if (elapsed < msPerMinute) {
    relTime = Res.Plural('SECONDS', Math.round(elapsed / 1000), fallBack);
  } else if (elapsed < msPerHour) {
    relTime = Res.Plural('MINUTES', Math.round(elapsed / msPerMinute), fallBack);
  } else if (elapsed < msPerDay) {
    relTime = Res.Plural('HOURS', Math.round(elapsed / msPerHour), fallBack);
  } else if (elapsed < msPerMonth) {
    relTime = Res.Plural('DAYS', Math.round(elapsed / msPerDay), fallBack);
  } else if (elapsed < msPerYear) {
    relTime = Res.Plural('MONTHS', Math.round(elapsed / msPerMonth), fallBack);
  }

  // replace the $0 with the relative time
  return (future ? Res.Get('INTIME') : Res.Get('TIMEAGO')).replace('$0', relTime);
};
