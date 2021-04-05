import React from 'react';
import PropTypes from 'prop-types';
import style from './health.module.scss';
import src from '../../assets/images/heart/pixel-heart.png';

const HealthBar = (props) => {
  const { lives } = props;

  return (
    <div className={style.game_hearts_bar}>
      <img src={src} alt="heart" />
      {lives}
    </div>
  );
};

HealthBar.propTypes = {
  lives: PropTypes.number.isRequired,
};

export default HealthBar;
