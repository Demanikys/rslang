import React from 'react';
import { Button } from 'react-bootstrap';
import style from './Keyboard.module.scss';
/* eslint-disable react/prop-types */

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
      setCheckedLetters([...checkedLetters, ...addToCheck]);
    } else {
      setMistakesCounter(mistakesCounter + 1);
    }
  };

  return (
    <div className={style.keyboardWrapper}>
      <div className={style.keyboard}>
        {letters.map((letter, index) => (
          <Button
            key={letter[index]}
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

export default Keyboard;
