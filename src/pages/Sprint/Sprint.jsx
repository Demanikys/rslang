import React, { useEffect, useState } from 'react';
import style from './sprint.module.scss';

const Sprint = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState([0, 0, 0]);
  useEffect(() => {
    const arr = [];
    level.forEach((elem, index) => {
      arr.push((index + 1 <= points) + 0);
      setLevel(arr);
    });
  }, [points]);
  return (
    <div className={style.wrapper}>
      <div className={style.pointsNumber}>
        0
        <div className={style.gameWindow}>
          {level.map((elem) => {
            if (elem === 1) {
              return <span className={style.answerRight}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
            }
            return <span className={style.answer}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
          })}
          <div className={style.points}>
            <button
              type="button"
              onClick={() => {
                if (points + 1 <= level.length) {
                  setPoints(points + 1);
                }
              }}
            >
              add point
            </button>
            <button
              type="button"
              onClick={() => {
                setLevel(new Array(level.length + 1).fill(0));
                setPoints(0);
              }}
            >
              add level
            </button>
            <button
              type="button"
              onClick={() => {
                setLevel(new Array(3).fill(0));
                setPoints(0);
              }}
            >
              reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
