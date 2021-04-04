import React, { useEffect, useRef, useState } from 'react';
import style from './sprint.module.scss';
import * as Buttons from '../components/buttons';
import data from './words.json';
import GameResultWindow from '../../../components/GameResultWindow';
import FullScreenButtons from '../../../components/FullScreenButton/FullScreenButtons';
import Timers from '../../../components/Timer';
import playAnswerSound from '../../../utilities/audioPlayer';
import backImage from '../../../assets/backgrounds/bg-sprint-game.svg';

const Sprint = () => {
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState([0, 0, 0]);
  const [word, setWord] = useState({});
  const [wrongWords, setWrongWords] = useState([]);
  const [rightWords, setRightWords] = useState([]);
  const [time, setTime] = useState(60);
  const [fullScreenStatus, setFullScreenStatus] = useState(false);
  const gameWindow = useRef();

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setFullScreenStatus(false);
      }
    });
    gameWindow.current.style.background = `url(${backImage})`;
    gameWindow.current.style.backgroundSize = 'cover';
    gameWindow.current.style.backgroundPosition = 'bottom';
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

  useEffect(() => {
    const arr = [];
    level.forEach((elem, index) => {
      arr.push((index + 1 <= points) + 0);
      setLevel(arr);
    });
  }, [points]);

  useEffect(() => {
    if (time === 0) {
      return;
    }

    const id = setTimeout(() => {
      if (time <= 0) {
        return clearTimeout(id);
      }
      setTime(time - 1);
    }, 1000);
  }, [time]);

  useEffect(() => {
    const randEnIndex = Math.floor(Math.random() * data.en.length);
    let randRuIndex;
    if (Math.random() > 0.5) {
      randRuIndex = Math.floor(Math.random() * data.ru.length);
    } else {
      randRuIndex = randEnIndex;
    }
    setWord({ en: randEnIndex, ru: randRuIndex });
  }, [points, score]);

  function resetLevel() {
    setWrongWords((oldWords) => [...oldWords, {
      word: data.en[word.en],
      wordTranslate: data.ru[word.en],
      userAnswer: data.en[word.ru],
      userAnswerTranslate: data.ru[word.ru],
    }]);
    setLevel(new Array(3).fill(0));
    setPoints(1);
    setPoints(0);
    playAnswerSound(false).play();
    if (score > 3 * wrongWords.length) setScore(score - 3 * wrongWords.length);
    else {
      setScore(score - 1);
    }
  }

  function addLevel() {
    setRightWords((oldWords) => [...oldWords, {
      word: data.en[word.en],
      wordTranslate: data.ru[word.en],
      userAnswer: data.en[word.ru],
      userAnswerTranslate: data.ru[word.ru],
    }]);
    if (points !== level.length) {
      setPoints(points + 1);
    } else {
      setLevel(new Array(level.length + 1).fill(0));
      setPoints(0);
    }
    playAnswerSound(true).play();
    setScore(score + 10 + points * 5 + level.length);
  }

  function leftButtonAction() {
    if (word.en !== word.ru) addLevel();
    else resetLevel();
  }

  function rightButtonAction() {
    if (word.en === word.ru) addLevel();
    else resetLevel();
  }

  useEffect(() => {
    if (time !== 0) {
      const eventHandler = (event) => {
        if (event.code === 'ArrowLeft') {
          leftButtonAction();
        } else if (event.code === 'ArrowRight') {
          rightButtonAction();
        }
      };

      document.addEventListener('keydown', eventHandler);

      return () => document.removeEventListener('keydown', eventHandler);
    }
  });

  return (
    time < 1
      ? (
        <GameResultWindow
          correctAnswers={rightWords}
          wrongAnswers={wrongWords}
        />
      )
      : (
        <div className={style.wrapper} ref={gameWindow}>
          <h2 className={style.header}>Спринт</h2>
          <div className={style.gameWindow}>
            <Timers value={time} />
            <h3 className={style.pointsNumber}>
              Очки:
              {' '}
              {score}
            </h3>
            <div>
              <div className={style.answerWrapper}>
                {level.map((elem) => {
                  if (elem === 1) {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        className={`bi bi-circle ${style.answerRight}`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      </svg>
                    );
                  }
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      className={`bi bi-circle ${style.answer}`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    </svg>
                  );
                })}
              </div>
              <div className={style.wordsWindow}>
                {data.en[word.en]}
                -
                {data.ru[word.ru]}
              </div>
              <div className={style.points}>
                <Buttons.WrongAnswerButton
                  action={leftButtonAction}
                />
                <Buttons.RightAnswerButton
                  action={rightButtonAction}
                />
              </div>
            </div>
            <FullScreenButtons
              fullScreenStatus={fullScreenStatus}
              onFullscreenBtnClick={onFullscreenBtnClick}
            />
          </div>
        </div>
      )
  );
};

export default Sprint;
