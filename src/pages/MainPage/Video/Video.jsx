import React from 'react';
import style from './Video.module.scss';
import YoutubeVideo from '../../../components/YoutubeVideo/YoutubeVideo';

const Video = () => (
  <div className={style.video}>
    <div>
      <h3>Take a look at example, how you can use RS Lang!</h3>
      <div className={style.video__block}>
        <YoutubeVideo embedId="rokGy0huYEA" />
      </div>
      <div className={style.video__word}>
        Improve
      </div>
    </div>
  </div>
);

export default Video;
