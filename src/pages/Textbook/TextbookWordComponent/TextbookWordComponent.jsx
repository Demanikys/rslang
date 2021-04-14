import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Howl } from 'howler';
import PropTypes from 'prop-types';
import style from './TextbookWordComponent.module.scss';
import {
  addNewHardWord,
  addNewRemovedWord,
  deleteFromHardWords,
  deleteFromRemovedWords,
} from '../../../actions/dictionaryAction';
import checkDeletedAndDifficultWords from '../../../utilities/checkDeletedAndDifficultWords';
import { getDeletedWords, getDifficultWords } from '../../../selectors/selectors';
// import { setUserData } from '../../../actions/userActions';

const TextbookWordComponent = (props) => {
  const { type, word, difficult } = props;
  // const userId = useSelector((state) => state.user.currentUser.userId);
  const deletedWords = useSelector(getDeletedWords);
  const difficultWords = useSelector(getDifficultWords);
  const textEx = useRef();
  const textMeaning = useRef();
  const wordRef = useRef();
  const dispatch = useDispatch();

  const wordSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audio}`,
  });

  const wordExampleSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audioExample}`,
  });

  const wordMeaningSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audioMeaning}`,
  });

  const onDeleteBtnClick = () => {
    const inDif = checkDeletedAndDifficultWords(difficultWords, word);
    if (!inDif) {
      const array = [];

      for (let i = 0; i < difficultWords.length; i += 1) {
        if (difficultWords[i].word !== wordRef.current.textContent) {
          array.push(difficultWords[i]);
        }
      }

      dispatch(deleteFromHardWords(array));
    }
    if (checkDeletedAndDifficultWords(deletedWords, word)) {
      dispatch(addNewRemovedWord(word));
    }
  };

  const onHardBtnClick = () => {
    console.log('click');
    if (checkDeletedAndDifficultWords(difficultWords, word)) {
      dispatch(addNewHardWord(word));
      console.log('async', [...difficultWords, word]);
    }
  };

  const onRestoreBtnClick = () => {
    if (type === 'hardWord') {
      const array = [];

      for (let i = 0; i < difficultWords.length; i += 1) {
        if (difficultWords[i].word !== wordRef.current.textContent) {
          array.push(difficultWords[i]);
        }
      }

      dispatch(deleteFromHardWords(array));
    } else if (type === 'deletedWord') {
      const array = [];

      for (let i = 0; i < deletedWords.length; i += 1) {
        if (deletedWords[i].word !== wordRef.current.textContent) {
          array.push(deletedWords[i]);
        }
      }

      dispatch(deleteFromRemovedWords(array));
    }
  };

  useEffect(() => {
    textEx.current.innerHTML = word.textExample;
    textMeaning.current.innerHTML = word.textMeaning;
  }, []);

  return (
    <div className={style.textbook_word}>
      <div className={style.picture}><img src={`https://newrslangapi.herokuapp.com/${word.image}`} alt="word_image" /></div>
      <div className={style.info}>
        <section>
          <article>
            <div className={style.header}>
              <h4 ref={wordRef}>{word.word}</h4>
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
            <div className={style.transcript}>
              <p>{word.transcription}</p>
              <p>{word.wordTranslate}</p>
            </div>
            <div>
              <div className={style.sentenceAndAudio}>
                <p ref={textMeaning} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="white"
                  className="bi bi-volume-up-fill"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    wordMeaningSound.play();
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
              <div className={style.sentenceAndAudio}>
                <p>{word.textMeaningTranslate}</p>
              </div>
              <div className={style.sentenceAndAudio}>
                <p ref={textEx} />
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
              <div className={style.sentenceAndAudio}>
                <p>{word.textExampleTranslate}</p>
              </div>
              {
                !difficult
                && <i>Сложное слово!</i>
              }
            </div>
            <div>
              {
                type === 'deletedWord'
                  ? <button type="button" onClick={() => onRestoreBtnClick()}>Restore</button>
                  : null
              }
              {
                type === 'hardWord'
                  ? <button type="button" onClick={() => onRestoreBtnClick()}>Restore</button>
                  : null
              }
              {
                type === 'normal'
                  ? (
                    <>
                      <button type="button" onClick={() => onDeleteBtnClick()}>Delete</button>
                      <button type="button" onClick={() => onHardBtnClick()}>Add to hard</button>
                    </>
                  )
                  : null
              }
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

TextbookWordComponent.propTypes = {
  type: PropTypes.string.isRequired,
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  difficult: PropTypes.bool.isRequired,
};

export default TextbookWordComponent;
