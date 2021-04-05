/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useRef, useState } from 'react';
import style from './GameSavanna.module.scss';
import words from './words.json';
import GameResultWindow from '../../components/GameResultWindow';

const GameSavanna = () => {
  const [wordCounter, setWordCounter] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState(100);
  const [currentWord, setCurrentWord] = useState(words[wordCounter]);
  const [currentWordAnswers, setCurrentWordAnswers] = useState();
  const [cls, setCls] = useState([style.game_current_word]);
  const [health, setHealth] = useState([1, 2, 3, 4, 5]);
  const [sound, setSound] = useState(true);
  const [answerBtnsState, setAnswerBtnsState] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const failTimerRef = useRef();

  useEffect(() => {
    words.sort(() => Math.random() - 0.5);
    return () => {
      clearTimeout(failTimerRef.current);
      document.onkeypress = null;
    };
  }, []);

  const chooseWordsForAnswers = (wordsArray) => {
    const answers = [currentWord];
    for (let i = 0; i < 3;) {
      const word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      if (!answers.includes(word)) {
        answers.push(word);
        i += 1;
      }
    }
    setCurrentWordAnswers(answers.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    if (isGameFinished) {
      return;
    }
    chooseWordsForAnswers(words);
    setTimeout(() => {
      setCls([style.game_current_word, style.game_current_word_active]);
      setAnswerBtnsState(true);
    }, 150);
  }, [currentWord]);

  const isGameOver = () => {
    console.log(health.length);
    if (health.length === 0 || wordCounter >= words.length) {
      setIsGameFinished(true);
      clearTimeout(failTimerRef.current);
    }
  };

  useEffect(() => {
    isGameOver();
    if (isGameFinished) {
      return;
    }
    setCurrentWord(words[wordCounter]);
  }, [wordCounter, isGameFinished]);

  const soundEffectsOnAnswerClick = (answer) => {
    if (!sound) {
      return;
    }

    const audio = new Audio();

    if (answer) {
      audio.src = 'assets/sound/savanna_correct_answer.mp3';
    } else {
      audio.src = 'assets/sound/savanna_wrong_answer.mp3';
    }

    audio.play();
  };

  useEffect(() => {
    if (isGameFinished) {
      return;
    }
    failTimerRef.current = setTimeout(() => {
      setCls([style.game_current_word, style.game_current_word_fail]);
      setHealth(health.slice(0, -1));
      soundEffectsOnAnswerClick(false);
      setAnswerBtnsState(false);
      setWrongAnswers([...wrongAnswers, currentWord]);
      setTimeout(() => {
        setCls([style.game_current_word]);
        setWordCounter(wordCounter + 1);
      }, 500);
    }, 4200);
    return () => clearTimeout(failTimerRef.current);
  }, [currentWord]);

  const onFullscreenBtnClick = (event) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      event.target.parentNode.parentNode.requestFullscreen().catch((e) => console.log(e));
    }
  };

  const onCorrectAnswerClick = () => {
    setCorrectAnswers([...correctAnswers, currentWord]);
    if (backgroundPosition !== 0) {
      if (backgroundPosition - 100 / words.length < 0) {
        setBackgroundPosition(0);
      } else {
        setBackgroundPosition(backgroundPosition - 100 / words.length);
      }
    }
  };

  const onAnswerClickHandler = (word) => {
    if (!answerBtnsState) {
      return;
    }

    if (word.wordTranslate === currentWord.wordTranslate) {
      if (wordCounter < words.length - 1) {
        setCls([style.game_current_word]);
        setWordCounter(wordCounter + 1);
        onCorrectAnswerClick();
        soundEffectsOnAnswerClick(true);
      } else {
        setIsGameFinished(true);
        clearTimeout(failTimerRef.current);
      }
    } else {
      setHealth(health.slice(0, -1));
      setCls(style.game_current_word);
      setWordCounter(wordCounter + 1);
      soundEffectsOnAnswerClick(false);
      setWrongAnswers([...wrongAnswers, currentWord]);
    }
    clearTimeout(failTimerRef.current);
  };

  const onKeyPressEventHandler = (event) => {
    switch (event.code) {
      case 'Digit1':
        onAnswerClickHandler(currentWordAnswers[0]);
        break;
      case 'Digit2':
        onAnswerClickHandler(currentWordAnswers[1]);
        break;
      case 'Digit3':
        onAnswerClickHandler(currentWordAnswers[2]);
        break;
      case 'Digit4':
        onAnswerClickHandler(currentWordAnswers[3]);
        break;
      default:
        return;
    }
    clearTimeout(failTimerRef.current);
  };

  document.onkeypress = onKeyPressEventHandler;

  return (
    <div className={[style.game, style.game_savanna].join(' ')} style={{ backgroundPositionY: `${backgroundPosition}%` }}>
      <div className={style.game_sound_switcher} onClick={() => setSound(!sound)}>
        {
                    sound
                      ? (<img src="assets/icons/sound_on_icon.png" alt="sound_on" />)
                      : (<img src="assets/icons/sound_off_icon.png" alt="sound_off" />)
                }
      </div>
      {
                isGameFinished
                  ? <GameResultWindow correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
                  : (
                    <div className={style.game_health_bar}>
                      {
                            health.map((item) => (
                              <div key={item} className={style.game_health}><img src="assets/icons/pixel-heart.png" alt="heart" /></div>
                            ))
                        }
                    </div>
                  )
            }

      <button type="button" className={[style.game_fullscreen_btn, style.game_btn].join(' ')} onClick={(event) => onFullscreenBtnClick(event)}><img src="assets/icons/full-screen.png" alt="fullscreen_icon" /></button>

      {
                currentWord && !isGameFinished
                  ? (
                    <div className={[...cls].join(' ')}>{currentWord.word}</div>
                  )
                  : null
            }

      {
                isGameFinished
                  ? null
                  : (
                    <>
                      <div className={style.game_finish_line} />
                      <div className={style.game_answers_block}>
                        {currentWordAnswers
                          ? (currentWordAnswers.map((item) => (
                            <button type="button" key={Math.random()} className={style.game_btn} onClick={() => onAnswerClickHandler(item)}>
                              {item.wordTranslate}
                            </button>
                          )))
                          : null}
                      </div>
                    </>
                  )
            }

    </div>
  );
};

export default GameSavanna;
