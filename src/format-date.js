import moment from 'moment';

export default function formatDate(fromDate, toDate, mask) {
  const delta = new Date(toDate) - new Date(fromDate);

  return moment(delta).format(mask);
}
