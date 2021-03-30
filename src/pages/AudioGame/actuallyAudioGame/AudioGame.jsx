import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ActiveStage from '../activeStage/ActiveStage';
import style from './audioGame.module.scss';
import GameResultWindow from '../../../components/GameResultWindow';
import playAnswerSound from '../../../utilities/audioPlayer';
import ResultProgressBar from '../../../components/ResultPregressBar';
/* eslint-disable react/prop-types */

const AudioGame = (props) => {
  const { words, fakeWords } = props;
  const [activeStage, setActiveStage] = useState(1);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [correct, setCorrectOrNot] = useState('default');
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [value] = useState(5);

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
                setCorrectOrNot={setCorrectOrNot}
                setCorrectAnswers={setCorrectAnswers}
                setWrongAnswers={setWrongAnswers}
                setNextBtnStatus={setNextBtnStatus}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
              />
            )
          }
          {
            !nextBtnStatus && (
              <Button
                onClick={() => {
                  setNextBtnStatus(true);
                  setCorrectOrNot('wrong');
                  setWrongAnswers([...wrongAnswers, words[activeStage - 1]]);
                  // dispatch(addWrongAnswer(words[activeStage - 1]));
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
                  setCorrectOrNot('default');
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
          <GameResultWindow
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            value={value}
          />
        </div>
      )
  );
};

export default AudioGame;
