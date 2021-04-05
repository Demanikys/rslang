import React, { useEffect, useRef } from 'react';
import style from './TextbookWordComponent.module.scss';

const TextbookWordComponent = (props) => {
  const dataProps = props;
  const { type } = dataProps;
  const item = dataProps.word;
  const textEx = useRef();
  const textMeaning = useRef();
  // console.log(item);

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
    if (localStorage.getItem('userDeletedWords')) {
      const deletedWordsArray = JSON.parse(localStorage.getItem('userDeletedWords'));
      deletedWordsArray.push(item.id);
      localStorage.setItem('userDeletedWords', JSON.stringify(deletedWordsArray));
    } else {
      localStorage.setItem('userDeletedWords', JSON.stringify([item.id]));
    }
    console.log(typeof (JSON.parse(localStorage.getItem('userDeletedWords'))));
  };

  const onHardBtnClick = () => {
    if (localStorage.getItem('userHardWords')) {
      const deletedWordsArray = JSON.parse(localStorage.getItem('userHardWords'));
      deletedWordsArray.push(item.id);
      localStorage.setItem('userHardWords', JSON.stringify(deletedWordsArray));
    } else {
      localStorage.setItem('userHardWords', JSON.stringify([item.id]));
    }
  };

  const onRestoreBtnClick = () => {
    const deletedWords = JSON.parse(localStorage.getItem('userDeletedWords'));
    deletedWords.forEach((key, index) => {
      if (key === item.id) {
        deletedWords.splice(index, 1);
      }
    });
    localStorage.setItem('userDeletedWords', JSON.stringify(deletedWords));
  };

  const onRemoveBtnClick = () => {
    const hardWords = JSON.parse(localStorage.getItem('userHardWords'));
    hardWords.forEach((key, index) => {
      if (key === item.id) {
        hardWords.splice(index, 1);
      }
    });
    localStorage.setItem('userHardWords', JSON.stringify(hardWords));
  };

  useEffect(() => {
    textEx.current.innerHTML = item.textExample;
    textMeaning.current.innerHTML = item.textMeaning;
  }, []);

  return (
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
  );
};

export default TextbookWordComponent;
