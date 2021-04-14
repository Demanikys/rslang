import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioGame from './actuallyAudioGame/AudioGame';
import { getFakeWords, getWords } from '../../utilities/getData';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-audiocall-game.svg';
import toggleShowStatus from '../../actions/footerAction';
import {
  getGameFromDictStatus,
  getGameFromTextbookStatus,
  getGameGroupNumber,
  getGamePageNumber, getGameWordsFromDict,
  getMiniGameLevel,
} from '../../selectors/selectors';

const StartAudioGame = () => {
  const [words, setWords] = useState([]);
  const [fakeWords, setFakeWords] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const level = useSelector(getMiniGameLevel);
  const textbookStatus = useSelector(getGameFromTextbookStatus);
  const pageNumber = useSelector(getGamePageNumber);
  const groupNumber = useSelector(getGameGroupNumber);
  const dictionaryStatus = useSelector(getGameFromDictStatus);
  const wordsFromDictionary = useSelector(getGameWordsFromDict);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleShowStatus(false));
  }, []);

  useEffect(async () => {
    let page;
    let currentLevel;
    let data;
    if (textbookStatus) {
      page = pageNumber;
      currentLevel = groupNumber + 1;
      if (dictionaryStatus) {
        data = wordsFromDictionary;
      } else {
        data = await getWords(currentLevel, page, 1);
      }
    } else {
      page = Math.floor(Math.random() * 30);
      currentLevel = level;
      data = await getWords(currentLevel, page, 1);
    }

    setWords(data.flat().sort(() => Math.random() - 0.5));
    const fake = await getFakeWords(currentLevel, page, 4);
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
