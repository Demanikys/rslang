import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import style from './resultProgressBar.scss';

const ResultProgressBar = (props) => {
  const { correct, wrong, value } = props;

  return (
    <ProgressBar className={style.progress}>
      <ProgressBar label={correct} variant="success" now={correct * value} key={1} />
      <ProgressBar label={wrong} variant="danger" now={wrong * value} key={2} />
    </ProgressBar>
  );
};

ResultProgressBar.propTypes = {
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default ResultProgressBar;
