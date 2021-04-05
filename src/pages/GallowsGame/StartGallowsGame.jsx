import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GallowsGame from './actuallyGallowsGame/GallowsGame';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-gallows-game.svg';
import toggleShowStatus from '../../actions/footerAction';

const StartGallowsGame = () => {
  const [words, setWords] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://newrslangapi.herokuapp.com/words/?group=2&page=10')
      .then((response) => response.json())
      .then((response) => setWords(response));
    dispatch(toggleShowStatus(false));
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
          back={backImage}
        />
      )
      : (
        <GallowsGame words={words} />
      )
  );
};

export default StartGallowsGame;
