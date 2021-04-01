import React, { useEffect, useState } from 'react';
import GameSavanna from './actuallyGameSavanna/GameSavanna';
import PresentComponent from '../../components/PresentComponent';

const GameSavannaContainer = () => {
  const [words, setWords] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    fetch('https://newrslangapi.herokuapp.com/words')
      .then((response) => response.json())
      .then((response) => setWords(response));
  }, []);

  return (
    isGameStarted
      ? <GameSavanna words={words} />
      : (
        <PresentComponent
          setStartGame={setIsGameStarted}
          words={words}
          gameName="Саванна"
          gameDescription="Мини-игра «Саванна» - это тренировка по переводу пассивного изученного словаря в активную стадию."
          gameRules="После запуска игры вы увидите падающее слово на английском (или русском, если режим игры RU-> EN) и четыре варианта перевода. Выбрать правильный ответ можно двумя способами:"
          gameOpportunityOne="1. Кликните по нему мышью;"
          gameOpportunityTwo="2. Используйте клавиши 1, 2, 3, 4."
        />
      )

  );
};

export default GameSavannaContainer;
