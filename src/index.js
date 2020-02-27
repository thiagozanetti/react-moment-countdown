import React, { useState, useEffect } from 'react';
import { oneOfType, func, instanceOf, string } from 'prop-types';
import { momentObj } from 'react-moment-proptypes';

import formatDate from './format-date';


const ReactMomentCountDown = ({
  toDate,
  sourceFormatMask,
  targetFormatMask,
  onTick,
  onCountdownEnd,
  ...otherProps
}) => {
  const [countdown, setCountdown] = useState(null);
  const [timer, setTimer] = useState(null);

  const tick = () => {
    const [delta, lastCountdown] = formatDate(toDate, targetFormatMask, sourceFormatMask);

    if (delta <= 0) {
      window.clearInterval(timer);
      setTimer(null);

      onCountdownEnd();
    } else {
      setCountdown(lastCountdown);

      onTick(delta);
    }
  };

  // componentDidMount
  useEffect(() => {
    tick();
    setTimer(window.setInterval(tick(), 1000));
  }, []);

  // componentWillUnmount
  useEffect(() => () => window.clearInterval(timer), []);

  return (
    <span {...otherProps}>{countdown}</span>
  );
};

ReactMomentCountDown.propTypes = {
  toDate: oneOfType([
    momentObj,
    instanceOf(Date),
    string
  ]).isRequired,
  sourceFormatMask: string.isRequired,
  targetFormatMask: string.isRequired,
  onTick: func.isRequired,
  onCountdownEnd: func.isRequired,
};

ReactMomentCountDown.defaultProps = {
  sourceFormatMask: 'YYYY-MM-DD',
  targetFormatMask: 'HH:mm:ss',
  onTick: f => f,
  onCountdownEnd: f => f,
};

export default ReactMomentCountDown;