import React, { useState, useEffect, useRef } from 'react';
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
  const timer = useRef();

  const tick = () => {
    const [delta, lastCountdown] = formatDate(toDate, targetFormatMask, sourceFormatMask);

    if (delta <= 0) {
      clearInterval(timer.current);
      timer.current = null;

      onCountdownEnd();
    } else {
      setCountdown(lastCountdown);

      onTick(delta);
    }
  };

  // componentDidMount, componentWillUmnount
  useEffect(() => {
    tick();
    timer.current = setInterval(tick, 1000);

    return () => clearInterval(timer.current);
  }, []);

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