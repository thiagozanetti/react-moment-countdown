import moment from 'moment';

export default function formatDate (toDate, targetFormatMask, sourceFormatMask) {
  // to prevent from returning negative duration
  const countdownMillisecond = Math.max(0, getDelta(toDate, sourceFormatMask));
  const duration = moment.duration(countdownMillisecond);
  const finalTargetFormatMask = editTargetFormatMask(duration, targetFormatMask);
  const countdownString = moment(duration._data).format(finalTargetFormatMask);

  return [countdownMillisecond, countdownString];
}

export function getDelta (toDate, sourceFormatMask) {
  if (!moment.isMoment(toDate)) {
    const convert = moment.isDate(toDate)
      ? moment(toDate)
      : moment(toDate, sourceFormatMask);

    return convert.diff(moment());
  }

  return toDate.diff(moment());
}

function editTargetFormatMask (duration, targetFormatMask) {
  const changeDate = [];

  if (duration.months() === 0) changeDate.push('M');
  if (duration.days() === 0) changeDate.push('D');

  return changeDate.reduce((acc, char) => {
    const charCount = acc.split('').filter(tfm => tfm === char).length;
    const charBefore = generateString(char, charCount);
    const charAfter = `[${generateString('0', charCount)}]`;
    return acc.replace(charBefore, charAfter);
  }, targetFormatMask);
}

function generateString (character, count) {
  return Array(count).fill(character).join('');
}
