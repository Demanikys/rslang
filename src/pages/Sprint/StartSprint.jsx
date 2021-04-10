import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PresentComponent from '../../components/PresentComponent';
import Sprint from './actuallySprintGame';
import backImage from '../../assets/backgrounds/bg-sprint-game.svg';
import toggleShowStatus from '../../actions/footerAction';
import { getWords } from '../../utilities/getData';
import { getMiniGameLevel } from '../../selectors/selectors';

const StartSprintGame = () => {
  const [words, setWords] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const level = useSelector(getMiniGameLevel);
  const dispatch = useDispatch();

  useEffect(async () => {
    const page = Math.floor(Math.random() * 30);
    const data = await getWords(level, page, 10);
    setWords(data.flat().sort(() => Math.random() - 0.5));
    dispatch(toggleShowStatus(false));
  }, []);

  return (
    !startGame
      ? (
        <PresentComponent
          setStartGame={setStartGame}
          words={words}
          gameName="Спринт"
          gameDescription="Мини-игра «Спринт» - это тренировка для повторения заученных слов из вашего словаря."
          gameRules="После запуска игры вы увидите слово и перевод. Вам нужно выбрать, правильно это или неправильно."
          gameOpportunityOne="1. Используйте мышь, чтобы выбрать."
          gameOpportunityTwo="2. Используйте клавиши влево и вправо."
          back={backImage}
        />
      )
      : (
        <Sprint words={words} />
      )
  );
};

export default StartSprintGame;
