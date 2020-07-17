export default (text) => {
  return parseFloat(
    text.replace(/[^(,|1|2|3|4|5|6|7|8|9|0)]/g, '').replace(/,/g, '.')
  );
  // parseFloat(text.replace(/,/g, ".").split("$")[1].trim());
};
