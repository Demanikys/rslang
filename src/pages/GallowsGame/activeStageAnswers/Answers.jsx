import React, { useEffect, useState } from 'react';
import style from './answers.module.scss';
/* eslint-disable react/prop-types */

const Answers = (props) => {
  const {
    word, checkedLetters, correct, wrong,
  } = props;
  const [letters, setLetters] = useState(() => {
    const lettersHtml = [];

    for (let i = 0; i < word.length; i += 1) {
      lettersHtml.push(<div className={style.letter} />);
    }

    return lettersHtml;
  });

  useEffect(() => {
    setLetters(() => {
      console.log(wrong, 'whyyyyy');
      const lettersHtml = [];

      for (let i = 0; i < word.length; i += 1) {
        if (checkedLetters.includes(i)) {
          lettersHtml.push(
            <div
              className={`${style.letter} ${correct ? style.correct : null} ${wrong ? style.wrong : null}`}
            >
              {word[i]}
            </div>,
          );
        } else {
          lettersHtml.push(
            <div
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

export default Answers;
