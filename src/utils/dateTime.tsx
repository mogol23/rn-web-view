import moment from 'moment';
import 'moment/locale/id';

moment.locale('en'); //default locale

export function instance(
  date: string | Date,
  fromFrormat: undefined | string,
  toFormat: undefined | string,
) {
  return moment(date, fromFrormat).locale('id').format(toFormat);
}

export function dateTime(
  date: string | Date,
  format: undefined | string = 'LLL',
) {
  return instance(date, undefined, format);
}

export function date(date: string | Date) {
  return instance(date, undefined, 'D MMM Y');
}

export function milis(date: string | Date) {
  return moment(date).format('x');
}

export function timeFromDate(date: string | Date) {
  return instance(date, undefined, 'HH:mm');
}

export function time(date: string | Date) {
  return instance(date, 'HH:mm:ss', 'HH:mm');
}

export function generateRandomDate(){
  return new Date(new Date(+(new Date()) - Math.floor(Math.random()*10000000000)));
}

export default dateTime;
