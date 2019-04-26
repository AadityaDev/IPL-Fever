import dayJs from 'dayjs';

export default (val, { minified, timestampMini } = {}) => {
  try {
    if (minified) {
      return dayJs(val).format('DD/MM/YYYY');
    }
    if (timestampMini) {
      return dayJs(val).format('h:m a');
    }
    return dayJs(val).format('MMM D, YYYY');
  } catch (err) {
    return '';
  }
};
