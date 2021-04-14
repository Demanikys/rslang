import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import style from './DictionaryPageComponent.module.scss';
import TextbookWordComponent from '../../TextbookWordComponent';
import checkDifficultWords from '../../../../utilities/checkDeletedAndDifficultWords';
import Pagination from '../../../../components/Pagination';
import { setGameFromDictionaryStatus, setGameGroup, setWordsFromDictionary } from '../../../../actions/mniGameAction';
import { setType } from '../../../../actions/dictionaryAction';

const DictionaryPageComponent = (props) => {
  const {
    type, words, difficultWords, setPageNumber, length, topic,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGameFromDictionaryStatus(true));
  }, []);

  useEffect(() => {
    dispatch(setWordsFromDictionary(words));
    dispatch(setGameGroup(topic - 1));
    dispatch(setType(type));
  }, [words]);

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
  topic: PropTypes.number.isRequired,
};

export default DictionaryPageComponent;
