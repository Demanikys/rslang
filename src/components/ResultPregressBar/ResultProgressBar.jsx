import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import style from './resultProgressBar.scss';
/* eslint-disable react/prop-types */

const ResultProgressBar = (props) => {
  const { correct, wrong } = props;
  console.log(correct, wrong);

  return (
    <ProgressBar className={style.progress}>
      <ProgressBar label={correct} variant="success" now={correct * 5} key={1} />
      <ProgressBar label={wrong} variant="danger" now={wrong * 5} key={2} />
    </ProgressBar>
  );
};

export default ResultProgressBar;
