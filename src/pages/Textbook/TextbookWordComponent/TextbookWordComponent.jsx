import React, { useEffect, useRef } from 'react';
import 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import style from './TextbookWordComponent.module.scss';
import { setDeletedCollection, setHardCollection } from '../../../reducers/userReducer';
import { userWordsDataSet, userWordsDataRemove } from '../../../actions/userActions';

const TextbookWordComponent = (props) => {
  const dataProps = props;
  const { type } = dataProps;
  const item = dataProps.word;
  const textEx = useRef();
  const textMeaning = useRef();
  const currentUserId = useSelector((state) => state.user.currentUser.userId);
  const deletedWordsList = useSelector((state) => state.user.deletedWords) || [];
  const hardWordsList = useSelector((state) => state.user.hardWords) || [];
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const showTranslate = useSelector((state) => state.textbook.showTranslate);
  const showButtons = useSelector((state) => state.textbook.showButtons);

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
    dispatch(setDeletedCollection([...deletedWordsList, item.id]));
  };

  const onHardBtnClick = () => {
    userWordsDataSet(currentUserId, item.id, 'hard');
    dispatch(setHardCollection([...hardWordsList, item.id]));
  };

  const onRestoreBtnClick = () => {
    userWordsDataRemove(currentUserId, item.id, 'deleted');

    deletedWordsList.forEach((word, index) => {
      if (word === item.id) {
        deletedWordsList.splice(index, 1);
      }
    });

    dispatch(setDeletedCollection([...deletedWordsList]));
    dataProps.setIsFetching(true);
  };

  const onRemoveBtnClick = () => {
    userWordsDataRemove(currentUserId, item.id, 'hard');

    hardWordsList.forEach((word, index) => {
      if (word === item.id) {
        hardWordsList.splice(index, 1);
      }
    });

    dispatch(setHardCollection([...hardWordsList]));
    dataProps.setIsFetching(true);
  };

  useEffect(() => {
    textEx.current.innerHTML = item.textExample;
    textMeaning.current.innerHTML = item.textMeaning;
  }, []);

  return (
    <>
      <div className={style.textbook_word}>
        <div className={style.picture}><img src={`https://newrslangapi.herokuapp.com/${item.image}`} alt="word_image" /></div>
        <div className={style.info}>
          <ul>
            <li>
              <span>{item.word}</span>
              <span>{item.transcription}</span>
              {
                showTranslate
                  ? <span>{item.wordTranslate}</span>
                  : null
              }
            </li>
            <li ref={textMeaning} />
            {
                showTranslate
                  ? <li>{item.textMeaningTranslate}</li>
                  : null
              }
            <li ref={textEx} />
            {
                showTranslate
                  ? <li>{item.textExampleTranslate}</li>
                  : null
              }
            {
                hardWordsList && hardWordsList.length > 0 && type === 'normal' && hardWordsList.includes(item.id) && isAuth
                  ? (<li>VERY HARD WORD</li>)
                  : null
              }
            <li>
              <button type="button" onClick={onPlayBtnClick}>Play</button>
              {
                  type === 'deletedWord'
                    ? <button type="button" onClick={onRestoreBtnClick}>Restore from deleted</button>
                    : null
              }
              {
                  type === 'hardWord'
                    ? <button type="button" onClick={onRemoveBtnClick}>Remove from hard</button>
                    : null
              }
              {
                  type === 'normal' && showButtons
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
      <br />
    </>
  );
};

export default TextbookWordComponent;
