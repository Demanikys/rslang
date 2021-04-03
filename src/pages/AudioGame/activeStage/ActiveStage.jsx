import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import style from './activeStage.module.scss';
import playAnswerSound from '../../../utilities/audioPlayer';

const createNewArray = () => {
  const arr = [];

  for (let i = 0; i < 5; i += 1) {
    const number = Math.floor(Math.random() * 20);
    if (!arr.includes(number)) {
      arr.push(number);
    } else {
      i -= 1;
    }
  }

  return arr;
};

const ActiveStage = React.memo((props) => {
  const {
    word, fakeWords, correct, setCorrectOrNot,
    setNextBtnStatus, setCorrectAnswers, setWrongAnswers,
    wrongAnswers, correctAnswers, setActiveStage,
    activeStage,
  } = props;
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 5));
  const [randomFakeNumbers, setRandomFakeNumbers] = useState(createNewArray());
  const textEx = useRef();
  const correctAnswerRef = useRef();
  const wordSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audio}`,
  });
  const wordExampleSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audioExample}`,
  });

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 5));
    setRandomFakeNumbers(createNewArray());
    wordSound.play();
  }, [word]);

  useEffect(() => {
    if (correct !== 'default') {
      textEx.current.innerHTML = word.textExample;
    }
  }, [correct]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (correct === 'right' || correct === 'wrong') {
        if (event.key === 'Enter') {
          setActiveStage(activeStage + 1);
          setNextBtnStatus(false);
          setCorrectOrNot('default');
        }
      } else if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5') {
        if ((event.key - 1) === randomNumber) {
          setCorrectOrNot('right');
          setNextBtnStatus(true);
          setCorrectAnswers([...correctAnswers, word]);
          playAnswerSound(true).play();
        } else {
          setCorrectOrNot('wrong');
          setNextBtnStatus(true);
          setWrongAnswers([...wrongAnswers, word]);
          playAnswerSound(false).play();
        }
      } else if (event.key === 'Enter') {
        setCorrectOrNot('wrong');
        setNextBtnStatus(true);
        setWrongAnswers([...wrongAnswers, word]);
        playAnswerSound(false).play();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  });

  const renderButtons = [1, 2, 3, 4, 5].map((el, i) => {
    if (i === randomNumber) {
      return (
        <Button
          key={word.word}
          ref={correctAnswerRef}
          onClick={() => {
            setCorrectOrNot('right');
            setNextBtnStatus(true);
            setCorrectAnswers([...correctAnswers, word]);
            playAnswerSound(true).play();
          }}
          variant="outline-light"
          disabled={(correct !== 'default')}
          className={(correct !== 'default' ? style.rightAnswer : null)}
        >
          {i + 1}
          .
          {word.wordTranslate}
        </Button>
      );
    }
    return (
      <Button
        key={fakeWords[randomFakeNumbers[i]].word}
        onClick={() => {
          setCorrectOrNot('wrong');
          setNextBtnStatus(true);
          setWrongAnswers([...wrongAnswers, word]);
          playAnswerSound(false).play();
        }}
        variant="outline-light"
        disabled={(correct !== 'default')}
        className={(correct !== 'default' ? style.wrongAnswer : null)}
      >
        {i + 1}
        .
        {fakeWords[randomFakeNumbers[i]].wordTranslate}
      </Button>
    );
  });

  return (
    <div>
      {correct === 'default' && (
      <div className={style.soundIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          fill="white"
          className="bi bi-volume-up-fill"
          viewBox="0 0 16 16"
          onClick={() => {
            wordSound.play();
          }}
        >
          <path
            d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
          />
          <path
            d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
          />
          <path
            d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
          />
        </svg>
      </div>
      )}
      {
        (correct === 'right' || correct === 'wrong') && (
          <div>
            <img className={style.image} src={`https://newrslangapi.herokuapp.com/${word.image}`} alt="" />
            <div className={style.wordSoundWrapper}>
              <div className={style.soundIconSmall}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="white"
                  className="bi bi-volume-up-fill"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    wordSound.play();
                  }}
                >
                  <path
                    d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                  />
                  <path
                    d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                  />
                  <path
                    d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                  />
                </svg>
              </div>
              <p>{word.word}</p>
              <p>{word.transcription}</p>
            </div>
            <div className={style.textSoundWrapper}>
              <div className={style.soundIconSmall}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="white"
                  className="bi bi-volume-up-fill"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    wordExampleSound.play();
                  }}
                >
                  <path
                    d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                  />
                  <path
                    d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                  />
                  <path
                    d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                  />
                </svg>
              </div>
              <p className={style.textExample} ref={textEx}>no</p>
            </div>
          </div>
        )
      }
      <div className={style.chooseAnswer}>
        {renderButtons}
      </div>
    </div>
  );
});

ActiveStage.propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  fakeWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  correct: PropTypes.string.isRequired,
  setCorrectOrNot: PropTypes.func.isRequired,
  setNextBtnStatus: PropTypes.func.isRequired,
  setCorrectAnswers: PropTypes.func.isRequired,
  setWrongAnswers: PropTypes.func.isRequired,
  wrongAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  correctAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveStage: PropTypes.func.isRequired,
  activeStage: PropTypes.number.isRequired,
};

export default ActiveStage;
