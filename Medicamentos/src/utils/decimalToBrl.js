export default (value) => {
  const formatedValue = value.toFixed(2).replace(".", ",");
  return "R$ " + formatedValue;
};
