import * as moment from 'moment';

export function dateFormat(date: any) {
  if (date) {
    return moment(date.toLocaleDateString()).format('YYYYMMDD');
  } else {
    return date;
  }
}

export function tableDateFormat(item: any, dateType: string) {
  switch (dateType) {
    case 'hour':
      let month = item.xs.substring(4, 6);
      let day = item.xs.substring(6, 8);
      let hour = item.xs.substring(item.xs.length - 2, item.xs.length);
      return `${month}/${day} ${hour}:00`;
    case 'day':
      if (item.ri) {
        return moment(item.ri).format('YYYY/MM/DD');
      } else if (item.date) {
        return moment(item.date).format('YYYY/MM/DD');
      } else if (item.vdate) {
        return moment(item.vdate).format('YYYY/MM/DD');
      } else {
        return '-';
      }
    case 'month':
      return moment(item.yue).format('YYYY/MM');
    case 'year':
      return item.year_;
    // tableDateFormatFun(item.year, 'YYYY');
  }
}
