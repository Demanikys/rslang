import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import style from '../AudioGame/actuallyAudioGame/audioGame.module.scss';
import GallowsGame from './actuallyGallowsGame/GallowsGame';
// import data from '../AudioGame/words.json';

const StartGallowsGame = () => {
  const [words, setWords] = useState(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    fetch('https://newrslangapi.herokuapp.com/words')
      .then((response) => response.json())
      .then((response) => setWords(response));
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
            (words
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
        <GallowsGame words={words} />
      )
  );
};

export default StartGallowsGame;
