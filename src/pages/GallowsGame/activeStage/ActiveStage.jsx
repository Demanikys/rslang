/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import hangmanOne from '../../../assets/images/hangman/Hangman-0.png';
import hangmanTwo from '../../../assets/images/hangman/Hangman-1.png';
import hangmanThree from '../../../assets/images/hangman/Hangman-2.png';
import hangmanFour from '../../../assets/images/hangman/Hangman-3.png';
import hangmanFive from '../../../assets/images/hangman/Hangman-4.png';
import hangmanSix from '../../../assets/images/hangman/Hangman-5.png';
import hangmanSeven from '../../../assets/images/hangman/Hangman-6.png';
import style from './activeStage.module.scss';
import playAnswerSound
  from '../../../commonFunctions/audioPlayer';
import Keyboard from '../Keyboard';
/* eslint-disable react/prop-types */

const ActiveStageGallows = React.memo((props) => {
  const { correct, word } = props;
  const [maxMistakes] = useState(7);
  const [mistakesCounter, setMistakesCounter] = useState(0);
  const [checkedLetters, setCheckedLetters] = useState([]);

  if (maxMistakes === mistakesCounter) console.log('sdfsdfsdfsdfsdfsdfsdfsdf');

  const images = [
    hangmanOne, hangmanTwo, hangmanThree,
    hangmanFour, hangmanFive, hangmanSix,
    hangmanSeven,
  ];
  console.log(word.word);

  useEffect(() => {
    if (checkedLetters.length === word.word.length) console.log('victory');
  }, [checkedLetters]);

  return (
    <div>
      {correct === 'default' && (
      <div>
        <img src={images[mistakesCounter]} alt="hangman" />
        <Keyboard
          mistakesCounter={mistakesCounter}
          word={word.word}
          setMistakesCounter={setMistakesCounter}
          setCheckedLetters={setCheckedLetters}
          checkedLetters={checkedLetters}
        />
      </div>
      )}
      {(correct === 'right' || correct === 'wrong') && (
      <div>
        result
      </div>
      )}
    </div>
  );
});

export default ActiveStageGallows;
