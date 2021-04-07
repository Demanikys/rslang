import React from 'react';
import style from './NavigationBlock.module.scss';
import Description from '../../../components/YoutubeVideo/Description/Description';
import Video from '../../../components/YoutubeVideo/Video/Video';

const NavigationBlock = () => (
  <div className={style.page}>
    <Description />
    <Video />
  </div>
);

export default NavigationBlock;
