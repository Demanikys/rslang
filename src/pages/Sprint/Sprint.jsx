import React, { useEffect, useState } from 'react';
import style from './sprint.module.scss';
import * as Buttons from './components/buttons';
import data from './words.json';
import leftArrowKey from './assets/left_arrow.jpg';
import rightArrowKey from './assets/right_arrow.jpg';

const Sprint = () => {
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState([0, 0, 0]);
  const [word, setWord] = useState({});
  const [wrongCount, setWrongCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [time, setTime] = useState(60);
  useEffect(() => {
    const arr = [];
    level.forEach((elem, index) => {
      arr.push((index + 1 <= points) + 0);
      setLevel(arr);
    });
  }, [points]);

  useEffect(() => {
    const id = setInterval(() => {
      if (time === 0) {
        clearInterval(id);
        return;
      }
      setTime((time) => time - 1);
    }, 1000);
    return () => { clearInterval(id); };
  }, );

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
    setWrongCount(wrongCount + 1);
    setLevel(new Array(3).fill(0));
    setPoints(0);
    if (score >= 3 * wrongCount) setScore(score - 3 * wrongCount);
    else setScore(0);
  }

  function addLevel() {
    setRightCount(rightCount + 1);
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

  function eventHandler(e) {
    if (e.code === 'ArrowLeft') {
      leftButtonAction();
    } else if (e.code === 'ArrowRight') {
      rightButtonAction();
    }
  }

  document.onkeydown = eventHandler;

  return (
    <div className={style.wrapper}>
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
      {
        time === 0 ? <div>That all folks!</div>
          : (
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
                <img src={leftArrowKey} alt="arrow key" className={style.arrowKey} aria-hidden="true" />
                <img src={rightArrowKey} alt="arrow key" className={style.arrowKey} aria-hidden="true" />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default Sprint;
