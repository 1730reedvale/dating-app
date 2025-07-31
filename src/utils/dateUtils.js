/**
 * Returns true if the given date is older than the specified number of days.
 * @param {Date} date
 * @param {number} days
 * @returns {boolean}
 */
export const isOlderThanDays = (date, days) => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays > days;
};
