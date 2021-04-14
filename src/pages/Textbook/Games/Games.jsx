import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import savannaSrc from '../../../assets/backgrounds/bg-savanna-game.svg';
import sprintSrc from '../../../assets/backgrounds/bg-sprint-game.svg';
import gallowsSrc from '../../../assets/backgrounds/bg-gallows-game.svg';
import audioSrc from '../../../assets/backgrounds/bg-audiocall-game.svg';
import style from '../../MiniGames/miniGames.module.scss';

const Games = () => {
  const savanna = useRef();
  const sprint = useRef();
  const gallows = useRef();
  const audioCall = useRef();

  useEffect(() => {
    savanna.current.style.backgroundImage = `url('${savannaSrc}')`;
    sprint.current.style.backgroundImage = `url('${sprintSrc}')`;
    gallows.current.style.backgroundImage = `url('${gallowsSrc}')`;
    audioCall.current.style.backgroundImage = `url('${audioSrc}')`;
  }, []);

  return (
    <div className={style.miniGames}>
      <Link
        className={style.gameWrapper}
        to="/sprint-game"
      >
        <div ref={sprint} className={style.game}>
          <h4>Спринт</h4>
        </div>
      </Link>
      <Link
        className={style.gameWrapper}
        to="/audio-game"
      >
        <div ref={audioCall} className={style.game}>
          <h4>Аудиовызов</h4>
        </div>
      </Link>
      <Link
        className={style.gameWrapper}
        to="/gallows-game"
      >
        <div ref={gallows} className={style.game}>
          <h4>Виселица</h4>
        </div>
      </Link>
      <Link
        className={style.gameWrapper}
        to="/savanna-game"
      >
        <div ref={savanna} className={style.game}>
          <h4>Саванна</h4>
        </div>
      </Link>
    </div>
  );
};

export default Games;
