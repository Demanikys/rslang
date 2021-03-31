import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './Keyboard.module.scss';
import playAnswerSound from '../../../utilities/audioPlayer';

const Keyboard = (props) => {
  const {
    mistakesCounter, word, setMistakesCounter,
    setCheckedLetters, checkedLetters, newGame,
  } = props;

  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const checkLetter = (e) => {
    const letter = e.target.innerHTML;
    e.target.disabled = true;

    if (word.includes(letter)) {
      const addToCheck = [];
      for (let i = 0; i < word.length; i += 1) {
        if (word[i] === letter) {
          addToCheck.push(i);
        }
      }
      playAnswerSound(true).play();
      setCheckedLetters([...checkedLetters, ...addToCheck]);
    } else {
      playAnswerSound(false).play();
      setMistakesCounter(mistakesCounter + 1);
    }
  };

  return (
    <div className={style.keyboardWrapper}>
      <div className={style.keyboard}>
        {letters.map((letter) => (
          <Button
            key={letter}
            className={style.keyboard_button}
            onClick={checkLetter}
            disabled={!newGame}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
};

Keyboard.propTypes = {
  mistakesCounter: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  setMistakesCounter: PropTypes.func.isRequired,
  setCheckedLetters: PropTypes.func.isRequired,
  checkedLetters: PropTypes.arrayOf(PropTypes.number).isRequired,
  newGame: PropTypes.bool.isRequired,
};

export default Keyboard;
