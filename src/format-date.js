import moment from 'moment';

export default function formatDate(toDate, targetFormatMask, sourceFormatMask) {
  let countdownMillisecond = getDelta(toDate, sourceFormatMask)
  let duration = moment.duration(countdownMillisecond)
  let finalTargetFormatMask = editTargetFormatMask(duration, targetFormatMask)
  let countdownString = moment(duration._data).format(targetFormatMask)

  return [countdownMillisecond, countdownString];
}

export function getDelta(toDate, sourceFormatMask) {
  if (!moment.isMoment(toDate)) {
    let convert = moment.isDate(toDate)
      ? moment(toDate)
      : moment(toDate, sourceFormatMask)
    return convert.diff(moment())
  }
  else return toDate.diff(moment())
}

function editTargetFormatMask (duration, targetFormatMask) {
  let changeDate = []
  if (duration.months() == 0) changeDate.push('M')
  if (duration.days() == 0) changeDate.push('D')
  return changeDate.reduce((acc, char) => {
    let charCount = acc.split('').filter(tfm => tfm == char).length
    let charBefore = generateString(char, charCount)
    let charAfter = `[${generateString('0', charCount)}]`
    return acc.replace(charBefore, charAfter)
  }, targetFormatMask)
}

function generateString (character, count) {
  return Array(count).fill(character).join('')
}
