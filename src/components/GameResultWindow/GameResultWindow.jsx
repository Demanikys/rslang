import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import style from './gameResultWindow.module.scss';
import ResultProgressBar from '../ResultPregressBar';
/* eslint-disable react/prop-types */

const GameResultWindow = (props) => {
<<<<<<< HEAD
  console.log(props)
  const { rightAnswers, wrongAnswers } = props;
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(resetRightAnswers());
    dispatch(resetWrongAnswers());
  }, []);

  const createAnswersMarkDown = (array) => array.map((answer, index) => (
    <p key={index}>
=======
  const { correctAnswers, wrongAnswers } = props;

  const createAnswersMarkDown = (array) => array.map((answer, index) => (
    <p key={answer.word}>
      {index + 1}
      )
>>>>>>> audioGame
      {answer.word}
    </p>
  ));

  return (
    <div className={style.resultWindow}>
      <ResultProgressBar correct={correctAnswers.length} wrong={wrongAnswers.length} />
      <div className={style.content}>
        <div className={style.contentResult}>
          <h5>Правльные ответы</h5>
<<<<<<< HEAD
          {rightAnswers.length ? createAnswersMarkDown(rightAnswers) : 'nothing'}
=======
          {correctAnswers ? createAnswersMarkDown(correctAnswers) : 'nothing'}
>>>>>>> audioGame
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
