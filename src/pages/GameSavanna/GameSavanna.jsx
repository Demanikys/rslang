import React, { useEffect, useRef, useState } from 'react';
import './GameSavanna.scss';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GameResultWindow from '../../components/GameResultWindow';
import playAnswerSound from '../../utilities/audioPlayer';

const GameSavanna = (props) => {
  const { words } = props;
  const [wordCounter, setWordCounter] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState(100);
  const [currentWord, setCurrentWord] = useState(words[wordCounter]);
  const [currentWordAnswers, setCurrentWordAnswers] = useState();
  const [cls, setCls] = useState(['game_current_word']);
  const [health, setHealth] = useState([1, 2, 3, 4, 5]);
  const [sound, setSound] = useState(true);
  const [answerBtnsState, setAnswerBtnsState] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [value] = useState(5);
  const failTimerRef = useRef();

  const chooseWordsForAnswers = (localWords) => {
    const answers = [currentWord];
    for (let i = 0; i < 3;) {
      const word = localWords[Math.floor(Math.random() * localWords.length)];
      if (!answers.includes(word)) {
        answers.push(word);
        i += 1;
      }
    }
    setCurrentWordAnswers(answers.sort(() => Math.random() - 0.5));
  };

  const isGameOver = () => {
    if (health.length === 0 || wordCounter >= words.length) {
      setIsGameFinished(true);
      clearTimeout(failTimerRef.current);
    }
  };

  useEffect(() => {
    words.sort(() => Math.random() - 0.5);
    return () => {
      clearTimeout(failTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isGameFinished) {
      return;
    }
    chooseWordsForAnswers(words);
    setTimeout(() => {
      setCls(['game_current_word', 'game_current_word_active']);
      setAnswerBtnsState(true);
    }, 100);
  }, [currentWord]);

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
      if (wordCounter < words.length) {
        setCls(['game_current_word']);
        setWordCounter(wordCounter + 1);
        onCorrectAnswerClick();
        playAnswerSound(true).play();
      } else {
        setIsGameFinished(true);
        clearTimeout(failTimerRef.current);
      }
    } else {
      setHealth(health.slice(0, -1));
      setCls(['game_current_word']);
      setWordCounter(wordCounter + 1);
      playAnswerSound(false).play();
      setWrongAnswers([...wrongAnswers, currentWord]);
    }
    clearTimeout(failTimerRef.current);
  };

  useEffect(() => {
    isGameOver();
    if (isGameFinished) {
      return;
    }
    setCurrentWord(words[wordCounter]);
  }, [wordCounter, isGameFinished]);

  useEffect(() => {
    if (isGameFinished) {
      return;
    }
    failTimerRef.current = setTimeout(() => {
      setCls(['game_current_word', 'game_current_word_fail']);
      setHealth(health.slice(0, -1));
      playAnswerSound(false).play();
      setAnswerBtnsState(false);
      setWrongAnswers([...wrongAnswers, currentWord]);
      setTimeout(() => {
        setCls(['game_current_word']);
        setWordCounter(wordCounter + 1);
      }, 500);
    }, 4200);

    return () => clearTimeout(failTimerRef.current);
  }, [currentWord]);

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

  const onFullscreenBtnClick = (event) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      event.target.closest('.game').requestFullscreen().catch((e) => console.log(e));
    }
  };

  return (
    <div className="game game_savanna" style={{ backgroundPositionY: `${backgroundPosition}%` }}>
      <Button className="game_sound_switcher" onClick={() => setSound(!sound)}>
        {
          sound
            ? (<img src="assets/icons/sound_on_icon.png" alt="sound_on" />)
            : (<img src="assets/icons/sound_off_icon.png" alt="sound_off" />)
        }
      </Button>
      {
        isGameFinished
          ? (
            <GameResultWindow
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
              value={value}
            />
          )
          : (
            <div className="game_health_bar">
              {
                health.map((item) => (
                  <div key={item} className="game_health"><img src="assets/icons/pixel-heart.png" alt="heart" /></div>
                ))
              }
            </div>
          )
      }

      <Button className="game_fullscreen_btn game_btn" onClick={(event) => onFullscreenBtnClick(event)}><img src="assets/icons/full-screen.png" alt="fullscreen_icon" /></Button>

      {
        currentWord && !isGameFinished
          ? (
            <div className={cls.join(' ')}>{currentWord.word}</div>
          )
          : null
      }

      {
        isGameFinished
          ? null
          : (
            <>
              <div className="game_finish_line" />
              <div className="game_answers_block">
                {currentWordAnswers
                  ? (currentWordAnswers.map((item) => (
                    <Button key={item.wordTranslate} className="game_btn" onClick={() => onAnswerClickHandler(item)}>
                      {item.wordTranslate}
                    </Button>
                  )))
                  : null}
              </div>
            </>
          )
      }

    </div>
  );
};

GameSavanna.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameSavanna;
