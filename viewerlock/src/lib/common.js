export const getDateStamp = (dayBefore = 0) => {
  let date = new Date();
  date.setHours(date.getHours() - dayBefore * 24);
  const isoDate = date.toISOString();
  date = new Date(isoDate.split("T", 1)[0]); // "1900-01-01"
  return date.getTime();
};
