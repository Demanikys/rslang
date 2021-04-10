import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './gameResultWindow.module.scss';
import backImage from '../../assets/backgrounds/bg-result.svg';

const GameResultWindow = React.memo((props) => {
  const { correctAnswers, wrongAnswers } = props;
  const gameWindow = useRef();

  useEffect(() => {
    gameWindow.current.style.background = `url('${backImage}')`;
  }, []);

  const createAnswersMarkDown = (array) => array.map((answer, index) => (
    <p key={answer.word}>
      {`${index + 1}) ${answer.word}`}
    </p>
  ));

  return (
    <div ref={gameWindow} className={style.gameWindowWrapper}>
      <div className={style.resultWindow}>
        <h4>Результаты</h4>
        <div className={style.content}>
          <div className={style.contentResult}>
            <div className={style.answersHeader}>
              <h5 className={style.blockHeader}>Правильные ответы</h5>
              <ProgressBar className={style.progressResult} variant="success" now={100} label={correctAnswers.length} />
            </div>
            <p>
              {correctAnswers.length ? createAnswersMarkDown(correctAnswers) : 'все неправильно!'}
            </p>
          </div>
          <hr />
          <div className={style.contentResult}>
            <div className={style.answersHeader}>
              <h5 className={style.blockHeader}>Неправильные ответы</h5>
              <ProgressBar className={style.progressResult} variant="danger" now={100} label={wrongAnswers.length} />
            </div>
            <p>
              {wrongAnswers.length ? createAnswersMarkDown(wrongAnswers) : 'все правильно!'}
            </p>
          </div>
        </div>
        <Button className={style.menu}>
          <Link to="/mini-games">Мини игры</Link>
        </Button>
      </div>
    </div>
  );
});

GameResultWindow.propTypes = {
  correctAnswers: PropTypes.objectOf(PropTypes.object).isRequired,
  wrongAnswers: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default GameResultWindow;
