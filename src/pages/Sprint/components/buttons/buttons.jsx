import React from 'react';
import PropTypes from 'prop-types';

function ThrowError() {
  console.error('Pass right function!');
}

function RightAnswerButton({ addLevel }) {
  return (
    <button
      type="button"
      onClick={() => {
        addLevel();
      }}
    >
      right answer
    </button>
  );
}

RightAnswerButton.propTypes = {
  addLevel: PropTypes.func,
};

RightAnswerButton.defaultProps = {
  addLevel: ThrowError,
};

function WrongAnswerButton({ resetLevel }) {
  return (
    <button
      type="button"
      onClick={() => {
        resetLevel();
      }}
    >
      wrong answer
    </button>
  );
}

WrongAnswerButton.propTypes = {
  resetLevel: PropTypes.func,
};

WrongAnswerButton.defaultProps = {
  resetLevel: ThrowError,
};

export { RightAnswerButton, WrongAnswerButton };
