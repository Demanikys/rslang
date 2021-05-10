import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PresentComponent from '../../components/PresentComponent';
import Sprint from './actuallySprintGame';
import backImage from '../../assets/backgrounds/bg-sprint-game.svg';
import toggleShowStatus from '../../actions/footerAction';
import { getWords } from '../../utilities/getData';
import {
  getGameFromTextbookStatus,
  getGameGroupNumber,
  getGamePageNumber,
  getMiniGameLevel,
} from '../../selectors/selectors';

const StartSprintGame = () => {
  const [words, setWords] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const level = useSelector(getMiniGameLevel);
  const textbookStatus = useSelector(getGameFromTextbookStatus);
  const pageNumber = useSelector(getGamePageNumber);
  const groupNumber = useSelector(getGameGroupNumber);
  const dispatch = useDispatch();

  useEffect(async () => {
    let page;
    let currentLevel;

    if (textbookStatus) {
      page = pageNumber;
      currentLevel = groupNumber + 1;
    } else {
      page = Math.floor(Math.random() * 30);
      currentLevel = level;
    }

    const data = await getWords(currentLevel, page, 10);
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
          fakeWords={[{ fake: true }]}
        />
      )
      : (
        <Sprint words={words} />
      )
  );
};

export default StartSprintGame;
