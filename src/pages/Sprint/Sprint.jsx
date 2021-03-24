import React, { useEffect, useState } from 'react';
import style from './sprint.module.scss';
import * as Buttons from './components/buttons';
import data from './words.json';

const Sprint = () => {
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState([0, 0, 0]);
  const [word, setWord] = useState({});
  useEffect(() => {
    const arr = [];
    level.forEach((elem, index) => {
      arr.push((index + 1 <= points) + 0);
      setLevel(arr);
    });
  }, [points]);

  useEffect(() => {
    const randEnIndex = Math.floor(Math.random() * data.en.length);
    let randRuIndex;
    if (Math.random() > 0.5) {
      randRuIndex = Math.floor(Math.random() * data.ru.length);
    } else {
      randRuIndex = randEnIndex;
    }
    setWord({ en: randEnIndex, ru: randRuIndex });
  }, [points]);

  function resetLevel() {
    setLevel(new Array(3).fill(0));
    setPoints(0);
  }

  function addLevel() {
    if (points !== level.length) {
      setPoints(points + 1);
    } else {
      setLevel(new Array(level.length + 1).fill(0));
      setPoints(0);
    }
    setScore(score + 10 + points * 5 + level.length);
  }

  return (
    <div className={style.wrapper}>
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
            action={() => {
              if (word.en !== word.ru) addLevel();
              else resetLevel();
            }}
          />
          <Buttons.RightAnswerButton
            action={() => {
              if (word.en === word.ru) addLevel();
              else resetLevel();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sprint;
