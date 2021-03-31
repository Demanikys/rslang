import React, { useEffect, useState } from 'react';
import GameSavanna from './GameSavanna';
import './GameSavannaContainer.scss';
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
          gameDescription="Дописать описание игры"
          gameRules="Во время игры вы увидите текущее отгадываемое слово
              и несколько вариантов перевода для него. Вам необходимо выбрать правильный вариант перевода
              до того как слово опустится в красную зону. Выбрать правильный ответ можно двумя способами:"
          gameOpportunityOne="1. Кликните по нему мышью;"
          gameOpportunityTwo="2. Используйте клавиши 1, 2, 3, 4."
        />
      )

  );
};

export default GameSavannaContainer;
