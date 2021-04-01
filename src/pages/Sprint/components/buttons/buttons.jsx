import React from 'react';
import PropTypes from 'prop-types';

function ThrowError() {
  console.error('Pass right function!');
}

function RightAnswerButton({ action }) {
  // document.addEventListener('keyup', (e) => {
  //   if (e.code === 'ArrowRight') {
  //     console.log('right pressed');
  //     action();
  //   }
  // });

  return (
    <button
      type="button"
      onClick={() => action()}
      onKeyUp={(e) => { console.log(e.code); }}
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
  // document.addEventListener('keyup', (e) => {
  //   if (e.code === 'ArrowLeft') {
  //     action();
  //   }
  // });

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
