import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import style from '../../AudioGame/actuallyAudioGame/audioGame.module.scss';
import ActiveStageGallows from '../activeStage/ActiveStage';
import ResultProgressBar from '../../../components/ResultPregressBar';
import GameResultWindow from '../../../components/GameResultWindow';
/* eslint-disable react/prop-types */

const GallowsGame = (props) => {
  const { words } = props;
  const [activeStage, setActiveStage] = useState(1);
  const [nextBtnStatus, setNextBtnStatus] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [newGame, setNewGame] = useState(true);

  console.log(correctAnswers);
  console.log(wrongAnswers);

  return (
    activeStage !== 6
      ? (
        <div className={style.wrapper}>
          <h2 className={style.header}>Audio game</h2>
          {
            words && (
              <ActiveStageGallows
                word={words[activeStage - 1]}
                setCorrectAnswers={setCorrectAnswers}
                setWrongAnswers={setWrongAnswers}
                setNextBtnStatus={setNextBtnStatus}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
                newGame={newGame}
                setNewGame={setNewGame}
              />
            )
          }
          <Button
            onClick={() => {
              setActiveStage(activeStage + 1);
              setNextBtnStatus(true);
              setNewGame(true);
            }}
            variant="warning"
            disabled={nextBtnStatus}
          >
            Next
          </Button>
          <ResultProgressBar correct={correctAnswers.length} wrong={wrongAnswers.length} />
        </div>
      )
      : (
        <div>
          <GameResultWindow
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
          />
        </div>
      )
  );
};

export default GallowsGame;
