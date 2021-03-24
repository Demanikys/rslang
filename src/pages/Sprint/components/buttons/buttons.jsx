import React from 'react';
import PropTypes from 'prop-types';

function ThrowError() {
  console.error('Pass right function!');
}

function RightAnswerButton({ action }) {
  return (
    <button
      type="button"
      onClick={() => action()}
    >
      right answer
    </button>
  );
}

RightAnswerButton.propTypes = {
  action: PropTypes.func,
};

RightAnswerButton.defaultProps = {
  action: ThrowError,
};

function WrongAnswerButton({ action }) {
  return (
    <button
      type="button"
      onClick={() => action()}
    >
      wrong answer
    </button>
  );
}

WrongAnswerButton.propTypes = {
  action: PropTypes.func,
};

WrongAnswerButton.defaultProps = {
  action: ThrowError,
};

export { RightAnswerButton, WrongAnswerButton };
