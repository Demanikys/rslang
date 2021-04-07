import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameSavanna from './actuallyGameSavanna/GameSavanna';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-savanna-game.svg';
import toggleShowStatus from '../../actions/footerAction';
import { getFakeWords, getWords } from '../../utilities/getData';
import { getMiniGameLevel } from '../../selectors/selectors';

const GameSavannaContainer = () => {
  const [words, setWords] = useState([]);
  const [fakeWords, setFakeWords] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const level = useSelector(getMiniGameLevel);
  const dispatch = useDispatch();

  useEffect(async () => {
    const page = Math.floor(Math.random() * 30);
    const data = await getWords(level, page, 1);
    setWords(data.flat().sort(() => Math.random() - 0.5));
    const fake = await getFakeWords(level, page, 3);
    setFakeWords(fake.flat().sort(() => Math.random() - 0.5));
    dispatch(toggleShowStatus(false));
  }, []);

  return (
    isGameStarted
      ? <GameSavanna words={words} fakeWords={fakeWords} />
      : (
        <PresentComponent
          setStartGame={setIsGameStarted}
          words={words}
          gameName="Саванна"
          gameDescription="Мини-игра «Саванна» - это тренировка по переводу пассивного изученного словаря в активную стадию."
          gameRules="После запуска игры вы увидите падающее слово на английском (или русском, если режим игры RU-> EN) и четыре варианта перевода. Выбрать правильный ответ можно двумя способами:"
          gameOpportunityOne="1. Кликните по нему мышью;"
          gameOpportunityTwo="2. Используйте клавиши 1, 2, 3, 4."
          back={backImage}
        />
      )

  );
};

export default GameSavannaContainer;
