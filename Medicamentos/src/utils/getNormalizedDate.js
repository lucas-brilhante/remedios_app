export default (date) => {
  if (!(date instanceof Date)) return "";

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const normalizedDate = `${day > 9 ? day : "0" + day}/${
    month > 9 ? month : "0" + month
  }/${date.getFullYear()}`;

  return normalizedDate;
};
