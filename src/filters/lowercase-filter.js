export default (val) => {
  try {
    return val.toLowerCase();
  } catch (err) {
    return '';
  }
};
