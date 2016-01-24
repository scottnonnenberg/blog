import moment from 'moment';

export default function shortDate(date) {
  var now = moment(new Date());
  var instance = moment(date);

  var currentYear = now.format('YYYY');
  var year = instance.format('YYYY');

  if (currentYear === year) {
    return instance.format('M/DD');
  }
  else {
    return instance.format('YYYY/MM/DD');
  }
};
