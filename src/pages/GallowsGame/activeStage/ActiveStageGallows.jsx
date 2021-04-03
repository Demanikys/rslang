import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hangmanOne from '../../../assets/images/hangman/Hangman-0.png';
import hangmanTwo from '../../../assets/images/hangman/Hangman-1.png';
import hangmanThree from '../../../assets/images/hangman/Hangman-2.png';
import hangmanFour from '../../../assets/images/hangman/Hangman-3.png';
import hangmanFive from '../../../assets/images/hangman/Hangman-4.png';
import hangmanSix from '../../../assets/images/hangman/Hangman-5.png';
import hangmanSeven from '../../../assets/images/hangman/Hangman-6.png';
import Keyboard from '../Keyboard';
import Answers from '../activeStageAnswers/Answers';
import style from './activeStage.module.scss';

const ActiveStageGallows = React.memo((props) => {
  const {
    word, setNextBtnStatus, newGame,
    setNewGame, setCorrectAnswers, setWrongAnswers,
    correctAnswers, wrongAnswers, setActiveStage, activeStage,
  } = props;
  const [maxMistakes] = useState(7);
  const [mistakesCounter, setMistakesCounter] = useState(0);
  const [checkedLetters, setCheckedLetters] = useState([]);
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);

  const images = [
    hangmanOne, hangmanTwo, hangmanThree,
    hangmanFour, hangmanFive, hangmanSix,
    hangmanSeven,
  ];

  useEffect(() => {
    if (checkedLetters.length === word.word.length) {
      setNextBtnStatus(false);
      setNewGame(false);
      setCorrect(true);
      setCorrectAnswers([...correctAnswers, word]);
    }
  }, [checkedLetters]);

  useEffect(() => {
    if (newGame === true) {
      setCheckedLetters([]);
      setCorrect(false);
      setWrong(false);
      setMistakesCounter(0);
    }
  }, [newGame]);

  useEffect(() => {
    if ((maxMistakes - 1) === mistakesCounter) {
      setNextBtnStatus(false);
      setNewGame(false);
      setWrong(true);
      setWrongAnswers([...wrongAnswers, word]);
    }
  }, [mistakesCounter]);

  return (
    <div className={style.wrapper}>
      <div>
        <div className={style.images}>
          <img className={style.imageGuess} src={`https://newrslangapi.herokuapp.com/${word.image}`} alt="" />
          <img className={style.gallows} src={images[mistakesCounter]} alt="hangman" />
        </div>
        <div className={style.mistakes}>
          <span>
            max mistakes:
            {maxMistakes - 1}
          </span>
          <span>
            mistakes:
            {mistakesCounter}
          </span>
        </div>
        <Answers
          word={word.word}
          checkedLetters={checkedLetters}
          correct={correct}
          wrong={wrong}
        />
        <Keyboard
          mistakesCounter={mistakesCounter}
          word={word.word}
          setMistakesCounter={setMistakesCounter}
          setCheckedLetters={setCheckedLetters}
          checkedLetters={checkedLetters}
          newGame={newGame}
          setNextBtnStatus={setNextBtnStatus}
          setNewGame={setNewGame}
          setActiveStage={setActiveStage}
          activeStage={activeStage}
        />
      </div>
    </div>
  );
});

ActiveStageGallows.propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  setNextBtnStatus: PropTypes.func.isRequired,
  newGame: PropTypes.bool.isRequired,
  setNewGame: PropTypes.func.isRequired,
  setCorrectAnswers: PropTypes.func.isRequired,
  setWrongAnswers: PropTypes.func.isRequired,
  correctAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  wrongAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeStage: PropTypes.number.isRequired,
  setActiveStage: PropTypes.func.isRequired,
};

export default ActiveStageGallows;
