import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { resetRightAnswers, resetWrongAnswers } from '../../actions/audioGameAction';
import style from './gameResultWindow.module.scss';
/* eslint-disable react/prop-types */

const GameResultWindow = (props) => {
  console.log(props)
  const { rightAnswers, wrongAnswers } = props;
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(resetRightAnswers());
    dispatch(resetWrongAnswers());
  }, []);

  const createAnswersMarkDown = (array) => array.map((answer, index) => (
    <p key={index}>
      {answer.word}
    </p>
  ));

  return (
    <div className={style.resultWindow}>
      <div className={style.content}>
        <div className={style.contentResult}>
          <h5>Правльные ответы</h5>
          {rightAnswers.length ? createAnswersMarkDown(rightAnswers) : 'nothing'}
        </div>
        <div className={style.contentResult}>
          <h5>Неправильные ответы</h5>
          {wrongAnswers.length ? createAnswersMarkDown(wrongAnswers) : 'nothing'}
        </div>
      </div>
      <Button className={style.menu}>
        <Link to="/">Меню</Link>
      </Button>
    </div>
  );
};

export default GameResultWindow;
