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
    setScore(0);
  }

  function addLevel() {
    console.log(data);
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
        <div className={style.gameWindow}>
          <div className={style.wordsWindow}>
            is
            {' '}
            {data.en[word.en]}
            {' '}
            translates as
            {' '}
            {data.ru[word.ru]}
            ?
          </div>
          {level.map((elem) => {
            if (elem === 1) {
              return <span className={style.answerRight}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
            }
            return <span className={style.answer}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
          })}
          <div className={style.points}>
            <Buttons.RightAnswerButton addLevel={addLevel} />
            <Buttons.WrongAnswerButton resetLevel={resetLevel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
