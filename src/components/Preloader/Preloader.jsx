import React from 'react';
import preloader from '../../assets/gif/preloader.svg';
import style from './prealoder.module.scss';

const Preloader = () => (
  <div className={style.preloader}>
    <img
      style={{ borderRadius: '50%', opacity: 0.5 }}
      src={preloader}
      alt="preloader"
      className={style.preloader}
    />
  </div>
);

export default Preloader;
