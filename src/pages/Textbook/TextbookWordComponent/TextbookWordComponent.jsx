import React, { useEffect, useRef } from 'react';
import 'firebase/database';
import { useSelector } from 'react-redux';
import style from './TextbookWordComponent.module.scss';
// import store from '../../../index';
import { userWordsDataSet, userWordsDataRemove } from '../../../actions/userActions';

const TextbookWordComponent = (props) => {
  const dataProps = props;
  const { type } = dataProps;
  const item = dataProps.word;
  const textEx = useRef();
  const textMeaning = useRef();
  const currentUserId = useSelector((state) => state.user.currentUser.userId);
  const deletedWordsList = useSelector((state) => state.user.deletedWords);
  const hardWordsList = useSelector((state) => state.user.hardWords);
  const isAuth = useSelector((state) => state.user.isAuth);

  const onPlayBtnClick = () => {
    const a = new Audio();
    const b = new Audio();
    const c = new Audio();
    a.src = `https://newrslangapi.herokuapp.com/${item.audio}`;
    b.src = `https://newrslangapi.herokuapp.com/${item.audioMeaning}`;
    c.src = `https://newrslangapi.herokuapp.com/${item.audioExample}`;
    a.play();
    a.addEventListener('ended', () => b.play());
    b.addEventListener('ended', () => c.play());
  };

  const onDeleteBtnClick = () => {
    userWordsDataSet(currentUserId, item.id, 'deleted');
  };

  const onHardBtnClick = () => {
    userWordsDataSet(currentUserId, item.id, 'hard');
  };

  const onRestoreBtnClick = () => {
    userWordsDataRemove(currentUserId, item.id, 'deleted');
  };

  const onRemoveBtnClick = () => {
    userWordsDataRemove(currentUserId, item.id, 'hard');
  };

  useEffect(() => {
    if (deletedWordsList && deletedWordsList.length > 0 && !deletedWordsList.includes(item.id)) {
      textEx.current.innerHTML = item.textExample;
      textMeaning.current.innerHTML = item.textMeaning;
    }
  }, []);

  return (

    deletedWordsList && deletedWordsList.length > 0 && deletedWordsList.includes(item.id) && type === 'normal' && isAuth
      ? null
      : (
        <div className={style.textbook_word}>
          <div className={style.picture}><img src={`https://newrslangapi.herokuapp.com/${item.image}`} alt="word_image" /></div>
          <div className={style.info}>
            <ul>
              <li>
                <span>{item.word}</span>
                <span>{item.transcription}</span>
                <span>{item.wordTranslate}</span>
              </li>
              <li ref={textMeaning} />
              <li>{item.textMeaningTranslate}</li>
              <li ref={textEx} />
              <li>{item.textExampleTranslate}</li>
              {
                deletedWordsList && deletedWordsList.length > 0 && type === 'normal' && hardWordsList.includes(item.id) && isAuth
                  ? (<li>VERY HARD WORD</li>)
                  : null
              }
              <li>
                <button type="button" onClick={onPlayBtnClick}>Play</button>
                {
                  type === 'deletedWord'
                    ? <button type="button" onClick={onRestoreBtnClick}>Restore</button>
                    : null
              }
                {
                  type === 'hardWord'
                    ? <button type="button" onClick={onRemoveBtnClick}>Restore</button>
                    : null
              }
                {
                  type === 'normal'
                    ? (
                      <>
                        <button type="button" onClick={onDeleteBtnClick}>Delete</button>
                        <button type="button" onClick={onHardBtnClick}>Add to hard</button>
                      </>
                    )
                    : null
              }
              </li>
            </ul>
          </div>
        </div>
      )

  );
};

export default TextbookWordComponent;
