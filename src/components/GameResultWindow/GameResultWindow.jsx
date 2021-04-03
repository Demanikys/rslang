import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './gameResultWindow.module.scss';

const GameResultWindow = React.memo((props) => {
  const { correctAnswers, wrongAnswers } = props;

  const createAnswersMarkDown = (array) => array.map((answer, index) => (
    <p key={answer.word}>
      {`${index + 1}) ${answer.word}`}
    </p>
  ));

  return (
    <div className={style.resultWindow}>
      <div className={style.content}>
        <div className={style.contentResult}>
          <div className={style.answersHeader}>
            <h5>Правльные ответы</h5>
            <ProgressBar variant="success" now={100} label={correctAnswers.length} />
          </div>
          {correctAnswers.length ? createAnswersMarkDown(correctAnswers) : 'nothing'}
        </div>
        <div className={style.contentResult}>
          <div className={style.answersHeader}>
            <h5>Неправильные ответы</h5>
            <ProgressBar variant="danger" now={100} label={wrongAnswers.length} />
          </div>
          {wrongAnswers.length ? createAnswersMarkDown(wrongAnswers) : 'nothing'}
        </div>
      </div>
      <Button className={style.menu}>
        <Link to="/">Меню</Link>
      </Button>
    </div>
  );
});

GameResultWindow.propTypes = {
  correctAnswers: PropTypes.objectOf(PropTypes.object).isRequired,
  wrongAnswers: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default GameResultWindow;
