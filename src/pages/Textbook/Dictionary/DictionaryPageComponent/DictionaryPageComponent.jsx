// import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import style from './DictionaryPageComponent.module.scss';
import TextbookWordComponent from '../../TextbookWordComponent';
import checkDifficultWords from '../../../../utilities/checkDeletedAndDifficultWords';
import Pagination from '../../../../components/Pagination';

const DictionaryPageComponent = (props) => {
  const {
    type, words, difficultWords, setPageNumber, length,
  } = props;

  return (
    <div className={style.page_component}>
      {
        words.map((word) => (
          <TextbookWordComponent
            word={word}
            type={type}
            key={word.id}
            difficult={type === 'deletedWord' ? true : checkDifficultWords(difficultWords, word)}
          />
        ))
      }
      <Pagination setPageNumber={setPageNumber} length={length} />
    </div>
  );
};

DictionaryPageComponent.propTypes = {
  type: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  difficultWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPageNumber: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};

export default DictionaryPageComponent;

// { !isFetching && (wordsArr.length === idArr.length)
//   ? (wordsArr.map((item) => (
//     <TextbookWordComponent word={item} type={type} key={item.id} />
//   )))
//   : null}
