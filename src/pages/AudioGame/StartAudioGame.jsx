import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { getFakeAudioData, getTruthAudioData } from '../../selectors/selectors';
import {
  getAudioDataFunc,
  getAudioFakeDataFunc, resetCorrectAnswers, resetWrongAnswers,
  setAudioGameData,
  setAudioGameFakeData,
} from '../../actions/audioGameAction';
import AudioGame from './actuallyAudioGame/AudioGame';
import style from './actuallyAudioGame/audioGame.module.scss';

const StartAudioGame = () => {
  const words = useSelector(getTruthAudioData);
  const fakeWords = useSelector(getFakeAudioData);
  const dispatch = useDispatch();
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    dispatch(getAudioDataFunc());
    dispatch(getAudioFakeDataFunc());

    return () => {
      dispatch(setAudioGameData(null));
      dispatch(setAudioGameFakeData(null));
      dispatch(resetCorrectAnswers());
      dispatch(resetWrongAnswers());
    };
  }, []);

  return (
    !startGame
      ? (
        <div className={style.wrapper}>
          <h2 className={style.header}>АУДИОВЫЗОВ</h2>
          <h4>Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.</h4>
          <p>
            Вы слышите слово и видите 5 вариантов перевода.
            Выбрать правильный ответ можно двумя способами:
          </p>
          <p>1. Кликните по нему мышью;</p>
          <p>2. Используйте клавиши 1, 2, 3, 4, 5.</p>
          {
      (words && fakeWords
        ? <Button onClick={() => setStartGame(true)} variant="primary">Начать игру</Button>
        : (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        ))
    }
        </div>
      )
      : (
        <AudioGame words={words} fakeWords={fakeWords} />
      )
  );
};

export default StartAudioGame;
