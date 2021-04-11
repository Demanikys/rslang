// import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import style from './DictionaryPageComponent.module.scss';
import TextbookWordComponent from '../../TextbookWordComponent';
import checkDeletedAndDifficultWords from '../../../../utilities/checkDeletedAndDifficultWords';

const DictionaryPageComponent = (props) => {
  const { type, words, difficultWords } = props;

  return (
    <div className={style.page_component}>
      {
        words.map((word) => (
          <TextbookWordComponent
            word={word}
            type={type}
            key={word.id}
            difficult={checkDeletedAndDifficultWords(difficultWords, word)}
          />
        ))
      }
    </div>
  );
};

DictionaryPageComponent.propTypes = {
  type: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  difficultWords: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DictionaryPageComponent;

// { !isFetching && (wordsArr.length === idArr.length)
//   ? (wordsArr.map((item) => (
//     <TextbookWordComponent word={item} type={type} key={item.id} />
//   )))
//   : null}
