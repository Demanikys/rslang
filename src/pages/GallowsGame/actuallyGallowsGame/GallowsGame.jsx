import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from '../../AudioGame/actuallyAudioGame/audioGame.module.scss';
import ActiveStageGallows from '../activeStage/ActiveStageGallows';
import ResultProgressBar from '../../../components/ResultPregressBar';
import GameResultWindow from '../../../components/GameResultWindow';
import FullScreenButtons from '../../../components/FullScreenButton/FullScreenButtons';

const GallowsGame = (props) => {
  const { words } = props;
  const [activeStage, setActiveStage] = useState(1);
  const [nextBtnStatus, setNextBtnStatus] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [newGame, setNewGame] = useState(true);
  const [value] = useState(20);
  const [fullScreenStatus, setFullScreenStatus] = useState(false);
  const gameWindow = useRef();

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setFullScreenStatus(false);
      }
    });
  }, []);

  const onFullscreenBtnClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreenStatus(false);
    } else {
      gameWindow.current.requestFullscreen().catch((e) => console.log(e));
      setFullScreenStatus(true);
    }
  };

  return (
    activeStage !== 6
      ? (
        <div ref={gameWindow} className={style.wrapper}>
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
                setActiveStage={setActiveStage}
                activeStage={activeStage}
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
          <ResultProgressBar
            correct={correctAnswers.length}
            wrong={wrongAnswers.length}
            value={value}
          />
          <FullScreenButtons
            fullScreenStatus={fullScreenStatus}
            onFullscreenBtnClick={onFullscreenBtnClick}
          />
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

GallowsGame.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GallowsGame;
