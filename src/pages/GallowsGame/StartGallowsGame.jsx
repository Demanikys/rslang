import React, { useEffect, useState } from 'react';
import GallowsGame from './actuallyGallowsGame/GallowsGame';
import PresentComponent from '../../components/PresentComponent';

const StartGallowsGame = () => {
  const [words, setWords] = useState(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    fetch('https://newrslangapi.herokuapp.com/words/?group=0&page=0')
      .then((response) => response.json())
      .then((response) => setWords(response));
  }, []);

  return (
    !startGame
      ? (
        <PresentComponent
          setStartGame={setStartGame}
          words={words}
          gameName="Виселица"
          gameDescription="Мини-игра «Виселица» - это тренировка, которая помогает запоминать правильное написание слов."
          gameRules="Вы видите картинку. Вам предстоит выбрать все буквы, которые используются в этом слове. Это можно сделать с помощью:"
          gameOpportunityOne="1. Кликайте по буквам;"
          gameOpportunityTwo="2. Используйте буквы на клавиатуре."
        />
      )
      : (
        <GallowsGame words={words} />
      )
  );
};

export default StartGallowsGame;
