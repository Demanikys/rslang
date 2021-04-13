import React from 'react';
import PropTypes from 'prop-types';

const withDictionaryPage = (Component) => {
  function DictionaryPage(props) {
    const {
      topic, words, type, difficultWords,
      pageNumber, setPageNumber,
    } = props;

    const wordsToShow = [...words].filter((word) => word.group === (topic - 1));
    let wordsToShowSlice;
    if (type === 'learnedWords') {
      wordsToShowSlice = words.slice((pageNumber - 1) * 20, pageNumber * 20);
    } else {
      wordsToShowSlice = wordsToShow.slice((pageNumber - 1) * 20, pageNumber * 20);
    }

    return (
      <Component
        words={wordsToShowSlice}
        type={type}
        difficultWords={difficultWords}
        setPageNumber={setPageNumber}
        length={type === 'learnedWords' ? words.length : wordsToShow.length}
      />
    );
  }

  DictionaryPage.propTypes = {
    topic: PropTypes.number.isRequired,
    words: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string.isRequired,
    difficultWords: PropTypes.arrayOf(PropTypes.object).isRequired,
    pageNumber: PropTypes.number.isRequired,
    setPageNumber: PropTypes.func.isRequired,
  };

  return DictionaryPage;
};

export default withDictionaryPage;
