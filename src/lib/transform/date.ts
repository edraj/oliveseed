export const displayDate = (date: Date | null): string | null => {
  if (!date) { return null; }
  return date.toDateString();
};
