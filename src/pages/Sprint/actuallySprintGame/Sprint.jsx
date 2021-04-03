import React, { useEffect, useRef, useState } from 'react';
import style from './sprint.module.scss';
import * as Buttons from '../components/buttons';
import data from './words.json';
import GameResultWindow from '../../../components/GameResultWindow';
import FullScreenButtons from '../../../components/FullScreenButton/FullScreenButtons';

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
    const eventHandler = (event) => {
      if (event.code === 'ArrowLeft') {
        leftButtonAction();
      } else if (event.code === 'ArrowRight') {
        rightButtonAction();
      }
    };

    document.addEventListener('keydown', eventHandler);

    return () => document.removeEventListener('keydown', eventHandler);
  });

  return (
    <div className={style.wrapper}>
      {
        time < 1
          ? (
            <GameResultWindow
              correctAnswers={rightWords}
              wrongAnswers={wrongWords}
            />
          )
          : (
            <div ref={gameWindow}>
              <div className={style.timeWrapper}>
                <div className={style.countdown}>
                  <div className={style.countdown__number}>{time}</div>
                  <svg className={style.countdown__svg}>
                    <circle className={style.countdown__circle} r="18" cx="20" cy="20" />
                  </svg>
                </div>
              </div>
              <div className={style.pointsNumber}>
                {score}
              </div>
              <div className={style.gameWindow}>
                {level.map((elem) => {
                  if (elem === 1) {
                    return <span className={style.answerRight}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
                  }
                  return <span className={style.answer}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
                })}
                <div className={style.wordsWindow}>
                  <div className={style.enWord}>
                    {data.en[word.en]}
                  </div>
                  <div className={style.ruWord}>
                    {data.ru[word.ru]}
                  </div>
                </div>
                <div className={style.points}>
                  <Buttons.WrongAnswerButton
                    action={leftButtonAction}
                  />
                  <Buttons.RightAnswerButton
                    action={rightButtonAction}
                  />
                </div>
                <div className={style.arrowButtons}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className={`${style.arrowKey} bi bi-arrow-left`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className={`${style.arrowKey} bi bi-arrow-right`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </div>
              </div>
              <FullScreenButtons
                fullScreenStatus={fullScreenStatus}
                onFullscreenBtnClick={onFullscreenBtnClick}
              />
            </div>
          )
      }
    </div>
  );
};

export default Sprint;
