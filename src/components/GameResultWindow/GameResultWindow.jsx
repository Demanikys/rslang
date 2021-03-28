import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './gameResultWindow.module.scss';
import ResultProgressBar from '../ResultPregressBar';

const GameResultWindow = (props) => {
  const { correctAnswers, wrongAnswers } = props;

  const createAnswersMarkDown = (array) => array.map((answer, index) => (
    <p key={answer.word}>
      {index + 1}
      )
      {answer.word}
    </p>
  ));

  return (
    <div className={style.resultWindow}>
      <ResultProgressBar correct={correctAnswers.length} wrong={wrongAnswers.length} />
      <div className={style.content}>
        <div className={style.contentResult}>
          <h5>Правльные ответы</h5>
          {correctAnswers ? createAnswersMarkDown(correctAnswers) : 'nothing'}
        </div>
        <div className={style.contentResult}>
          <h5>Неправильные ответы</h5>
          {wrongAnswers ? createAnswersMarkDown(wrongAnswers) : 'nothing'}
        </div>
      </div>
      <Button className={style.menu}>
        <Link to="/">Меню</Link>
      </Button>
    </div>
  );
};

GameResultWindow.propTypes = {
  correctAnswers: PropTypes.objectOf(PropTypes.object).isRequired,
  wrongAnswers: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default GameResultWindow;
