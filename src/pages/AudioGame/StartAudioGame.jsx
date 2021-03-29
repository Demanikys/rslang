import React, { useEffect, useState } from 'react';
import AudioGame from './actuallyAudioGame/AudioGame';
import getWords from '../../commonFunctions/getData';
import PresentComponent from '../../components/PresentComponent';

const StartAudioGame = () => {
  const [words, setWords] = useState(null);
  const [fakeWords, setFakeWords] = useState(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    fetch('https://newrslangapi.herokuapp.com/words')
      .then((response) => response.json())
      .then((response) => setWords(response));

    setFakeWords(getWords());
  }, []);

  return (
    !startGame
      ? (
        <PresentComponent
          setStartGame={setStartGame}
          words={words}
          gameName="Аудиовызов"
          gameDescription="Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода."
          gameRules="Вы слышите слово и видите 5 вариантов перевода. Выбрать правильный ответ можно двумя способами:"
          gameOpportunityOne="1. Кликните по нему мышью;"
          gameOpportunityTwo="2. Используйте клавиши 1, 2, 3, 4, 5."
        />
      )
      : (
        <AudioGame words={words} fakeWords={fakeWords} />
      )
  );
};

export default StartAudioGame;
