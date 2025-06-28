import { Res } from '$utils/resources';

export const displayDate = (date: Date | null, withTime = false): string | null => {
  if (!date) { return null; }
  if (withTime) { return date.toLocaleString(Res.language); }
  return date.toLocaleDateString(Res.language);
};

export const displayTime = (time: string | null): string | null => {
  // turn the time into local time
  return null;
};

export const relativeTime = (date: Date | null, future: boolean = false): string | null => {


  const current = Date.now();
  const input = date.valueOf();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = Math.abs(input - current);
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
