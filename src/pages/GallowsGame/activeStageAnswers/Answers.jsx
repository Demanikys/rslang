import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './answers.module.scss';

const Answers = (props) => {
  const {
    word, checkedLetters, correct, wrong,
  } = props;
  const [letters, setLetters] = useState(() => {
    const lettersHtml = [];

    for (let i = 0; i < word.length; i += 1) {
      lettersHtml.push(<div key={`${word[i]}${i}`} className={style.letter} />);
    }

    return lettersHtml;
  });

  useEffect(() => {
    setLetters(() => {
      const lettersHtml = [];

      for (let i = 0; i < word.length; i += 1) {
        if (checkedLetters.includes(i)) {
          lettersHtml.push(
            <div
              key={`${word[i]}${i}`}
              className={`${style.letter} ${correct ? style.correct : null} ${wrong ? style.wrong : null}`}
            >
              {word[i]}
            </div>,
          );
        } else {
          lettersHtml.push(
            <div
              key={`${word[i]}${i}`}
              className={`${style.letter} ${wrong ? style.wrong : null}`}
            />,
          );
        }
      }

      return lettersHtml;
    });
  }, [checkedLetters, correct, wrong]);

  return (
    <div className={style.lettersWrapper}>
      {letters}
    </div>
  );
};

Answers.propTypes = {
  word: PropTypes.string.isRequired,
  checkedLetters: PropTypes.arrayOf(PropTypes.number).isRequired,
  correct: PropTypes.bool.isRequired,
  wrong: PropTypes.bool.isRequired,
};

export default Answers;
