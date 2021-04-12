import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './TextbookSettings.module.scss';
import { changeTranslateVis, changeButtonsVis } from '../../../reducers/textbookReducer';

const TextbookSettings = () => {
  const dispatch = useDispatch();
  const showTranslate = useSelector((state) => state.textbook.showTranslate);
  const showButtons = useSelector((state) => state.textbook.showButtons);
  const onTranslateBtnClick = () => {
    dispatch(changeTranslateVis(!showTranslate));
  };

  const onShowBtnClick = () => {
    dispatch(changeButtonsVis(!showButtons));
  };

  return (
    <div className={style.textbook_settings}>
      <button type="button" onClick={onTranslateBtnClick}>
        {
            showTranslate
              ? 'Скрыть перевод'
              : 'Показать перевод'
          }
      </button>
      <button type="button" onClick={onShowBtnClick}>
        {
              showButtons
                ? 'Скрыть кнопки'
                : 'Показать кнопки'
          }
      </button>
    </div>
  );
};

export default TextbookSettings;
