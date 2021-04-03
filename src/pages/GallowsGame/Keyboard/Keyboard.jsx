import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './Keyboard.module.scss';
import playAnswerSound from '../../../utilities/audioPlayer';

const Keyboard = (props) => {
  const {
    mistakesCounter, word, setMistakesCounter,
    setCheckedLetters, checkedLetters, newGame,
    setNewGame, setNextBtnStatus, setActiveStage,
    activeStage,
  } = props;
  const [disabledButtons, setDisabledButtons] = useState([]);
  const buttonsRefs = useRef([]);
  const letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ];

  buttonsRefs.current = letters.map(() => React.createRef());

  const checkLetter = (e) => {
    const letter = e.target.innerHTML;
    e.target.disabled = true;
    setDisabledButtons([...disabledButtons, e.target.innerText]);

    if (word.toLowerCase().includes(letter)) {
      const addToCheck = [];
      for (let i = 0; i < word.length; i += 1) {
        if (word[i].toLowerCase() === letter) {
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

  useEffect(() => {
    let disableKey = false;

    const keyDownHandler = (event) => {
      if (letters.some((el) => el === event.key)) {
        disableKey = !!disabledButtons.join('').toLowerCase().match(event.key);

        for (let i = 0; i < buttonsRefs.current.length; i += 1) {
          if (buttonsRefs.current[i].current.innerText.toLowerCase() === event.key) {
            buttonsRefs.current[i].current.disabled = true;
            break;
          }
        }

        if (!disableKey) {
          if (word.toLowerCase().includes(event.key.toLowerCase())) {
            const addToCheck = [];
            for (let i = 0; i < word.length; i += 1) {
              if (word[i].toLowerCase() === event.key.toLowerCase()) {
                addToCheck.push(i);
              }
            }
            playAnswerSound(true).play();
            setCheckedLetters([...checkedLetters, ...addToCheck]);
          } else {
            playAnswerSound(false).play();
            setMistakesCounter(mistakesCounter + 1);
          }
          setDisabledButtons([...disabledButtons, event.key]);
        }
      } else if (event.key === 'Enter') {
        if (!newGame) {
          setActiveStage(activeStage + 1);
          setNextBtnStatus(true);
          setNewGame(true);
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  });

  useEffect(() => {
    if (!newGame) {
      setDisabledButtons(letters);
    } else {
      setDisabledButtons([]);
    }
  }, [newGame]);

  return (
    <div className={style.keyboardWrapper}>
      <div className={style.keyboard}>
        {letters.map((letter, i) => (
          <Button
            ref={buttonsRefs.current[i]}
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
  setNewGame: PropTypes.func.isRequired,
  setNextBtnStatus: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  activeStage: PropTypes.number.isRequired,
};

export default Keyboard;
