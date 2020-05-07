import moment from 'moment';

export default function formatDate(toDate, targetFormatMask, sourceFormatMask) {
  // to prevent from returning negative duration
  const countdownMillisecond = Math.max(0, getDelta(toDate, sourceFormatMask));
  const duration = moment.duration(countdownMillisecond);

  //to correctly display the countdown from the most granular unit
  const countdownString = moment.utc(duration.as('milliseconds')).format(targetFormatMask);

  return [countdownMillisecond, countdownString];
}

export function getDelta(toDate, sourceFormatMask) {
  if (!moment.isMoment(toDate)) {
    const convert = moment.isDate(toDate)
      ? moment(toDate)
      : moment(toDate, sourceFormatMask);

    return convert.diff(moment());
  }

  return toDate.diff(moment());
}
