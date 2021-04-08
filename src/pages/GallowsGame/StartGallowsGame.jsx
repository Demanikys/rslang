import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GallowsGame from './actuallyGallowsGame/GallowsGame';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-gallows-game.svg';
import toggleShowStatus from '../../actions/footerAction';
import { getMiniGameLevel } from '../../selectors/selectors';
import { getWords } from '../../utilities/getData';

const StartGallowsGame = () => {
  const [words, setWords] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const level = useSelector(getMiniGameLevel);
  const dispatch = useDispatch();

  useEffect(async () => {
    const page = Math.floor(Math.random() * 30);
    const data = await getWords(level, page, 1);
    const localData = data.flat();
    const sliceData = [];
    for (let i = 0; i < 5; i += 1) {
      const word = localData[Math.floor(Math.random() * 20)];
      if (!sliceData.includes(word)) {
        sliceData.push(word);
      } else {
        i -= 1;
      }
    }
    setWords(sliceData.sort(() => Math.random() - 0.5));
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
