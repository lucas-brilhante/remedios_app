export default (text) => {
  const date = text.slice(0, 10);
  const dateAttributes = date.split("-");
  return dateAttributes[2] + "/" + dateAttributes[1] + "/" + dateAttributes[0];
};
