import moment from 'moment';

export default function shortDate(date) {
  const now = moment(new Date());
  const instance = moment(date);

  const currentYear = now.format('YYYY');
  const year = instance.format('YYYY');

  if (currentYear === year) {
    return instance.format('MMM DD');
  }

  return instance.format('YYYY MMM DD');
}
