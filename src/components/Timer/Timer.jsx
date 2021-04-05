import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import style from './timer.module.scss';

const Timer = ({ value }) => {
  const timer = useRef();

  useEffect(() => {
    const secondDeg = (360 / 60) * value;
    timer.current.style.transform = `rotate(-${secondDeg}deg)`;
  }, [value]);

  return (
    <div className={style.second}>
      <div ref={timer} />
      <span>{value}</span>
    </div>
  );
};

Timer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Timer;
