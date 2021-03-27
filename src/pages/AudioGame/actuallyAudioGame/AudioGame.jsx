import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ActiveStage from '../activeStage/ActiveStage';
import style from './audioGame.module.scss';
import { addWrongAnswer, setAudioGameData, setAudioGameFakeData } from '../../../actions/audioGameAction';
import GameResultWindow from '../../../components/GameResultWindow';
import { getCorrectAnswersAudioGame, getWrongAnswersAudioGame } from '../../../selectors/selectors';
import playAnswerSound from '../../../components/AudioPlayer/audioPlayer';
import ResultProgressBar from '../../../components/ResultPregressBar';
/* eslint-disable react/prop-types */

const AudioGame = (props) => {
  const { words, fakeWords } = props;
  const [activeStage, setActiveStage] = useState(1);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [correct, setCorrect] = useState('default');
  const correctAnswers = useSelector(getCorrectAnswersAudioGame);
  const wrongAnswers = useSelector(getWrongAnswersAudioGame);
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setAudioGameData(null));
    dispatch(setAudioGameFakeData(null));
  }, []);

  return (
    activeStage !== 21
      ? (
        <div className={style.wrapper}>
          <h2 className={style.header}>Audio game</h2>
          {
            words && fakeWords && (
              <ActiveStage
                word={words[activeStage - 1]}
                fakeWords={fakeWords}
                correct={correct}
                setCorrect={setCorrect}
                setNextBtnStatus={setNextBtnStatus}
              />
            )
          }
          {
            !nextBtnStatus && (
              <Button
                onClick={() => {
                  setNextBtnStatus(true);
                  setCorrect('wrong');
                  dispatch(addWrongAnswer(words[activeStage - 1]));
                  playAnswerSound(false).play();
                  console.log('after');
                }}
                variant="warning"
              >
                Don&apos;t know
              </Button>
            )
          }
          {
            nextBtnStatus && (
              <Button
                onClick={() => {
                  setActiveStage(activeStage + 1);
                  setNextBtnStatus(false);
                  setCorrect('default');
                }}
                variant="warning"
              >
                Next
              </Button>
            )
          }
          <ResultProgressBar correct={correctAnswers.length} wrong={wrongAnswers.length} />
        </div>
      )
      : (
        <div>
          <GameResultWindow correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
        </div>
      )
  );
};

export default AudioGame;
