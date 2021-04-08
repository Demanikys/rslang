import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function ThrowError() {
  console.error('Pass right function!');
}

function RightAnswerButton({ action, setItem, item }) {
  return (
    <Button
      variant="success"
      onClick={() => {
        action();
        setItem(item + 1);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-arrow-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
      </svg>
    </Button>
  );
}

RightAnswerButton.propTypes = {
  action: PropTypes.func,
  setItem: PropTypes.func.isRequired,
  item: PropTypes.number.isRequired,
};

RightAnswerButton.defaultProps = {
  action: ThrowError,
};

function WrongAnswerButton({ action, setItem, item }) {
  return (
    <Button
      variant="danger"
      onClick={() => {
        action();
        setItem(item + 1);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
        className="bi bi-arrow-left"
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </Button>
  );
}

WrongAnswerButton.propTypes = {
  action: PropTypes.func,
  setItem: PropTypes.func.isRequired,
  item: PropTypes.number.isRequired,
};

WrongAnswerButton.defaultProps = {
  action: ThrowError,
};

export { RightAnswerButton, WrongAnswerButton };
