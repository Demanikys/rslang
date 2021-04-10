import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioGame from './actuallyAudioGame/AudioGame';
import { getFakeWords, getWords } from '../../utilities/getData';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-audiocall-game.svg';
import toggleShowStatus from '../../actions/footerAction';
import { getMiniGameLevel } from '../../selectors/selectors';

const StartAudioGame = () => {
  const [words, setWords] = useState([]);
  const [fakeWords, setFakeWords] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const level = useSelector(getMiniGameLevel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleShowStatus(false));
  }, []);

  useEffect(async () => {
    const page = Math.floor(Math.random() * 30);
    const data = await getWords(level, page, 1);
    setWords(data.flat().sort(() => Math.random() - 0.5));
    const fake = await getFakeWords(level, page, 4);
    setFakeWords(fake.flat().sort(() => Math.random() - 0.5));
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
          back={backImage}
          fakeWords={fakeWords}
        />
      )
      : (
        <AudioGame
          words={words}
          fakeWords={fakeWords}
        />
      )
  );
};

export default StartAudioGame;
