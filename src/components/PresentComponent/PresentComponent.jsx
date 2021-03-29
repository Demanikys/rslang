import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import style from './presentComponent.module.scss';
/* eslint-disable react/prop-types */

const PresentComponent = (props) => {
  const {
    words, setStartGame, gameName,
    gameDescription, gameRules, gameOpportunityOne,
    gameOpportunityTwo,
  } = props;

  return (
    <div className={style.wrapper}>
      <h2 className={style.header}>{gameName}</h2>
      <h4>{gameDescription}</h4>
      <p>{gameRules}</p>
      <p>{gameOpportunityOne}</p>
      <p>{gameOpportunityTwo}</p>
      {
        (words
          ? <Button onClick={() => setStartGame(true)} variant="primary">Начать игру</Button>
          : (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </Button>
          )
        )
      }
    </div>
  );
};

export default PresentComponent;
