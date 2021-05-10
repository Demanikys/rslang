import React, { useEffect, useRef } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './presentComponent.module.scss';

const PresentComponent = (props) => {
  const {
    words, setStartGame, gameName,
    gameDescription, gameRules, gameOpportunityOne,
    gameOpportunityTwo, back, fakeWords,
  } = props;
  const gameBack = useRef();

  useEffect(() => {
    gameBack.current.style.background = `url('${back}')`;
    gameBack.current.style.backgroundSize = 'cover';
    gameBack.current.style.backgroundPosition = 'bottom';
  }, []);

  return (
    <div ref={gameBack} className={style.wrapper}>
      <h2 className={style.header}>{gameName}</h2>
      <h4>{gameDescription}</h4>
      <p>{gameRules}</p>
      <p>{gameOpportunityOne}</p>
      <p>{gameOpportunityTwo}</p>
      {
          (words.length > 0 && fakeWords.length > 0
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

PresentComponent.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  fakeWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStartGame: PropTypes.func.isRequired,
  gameName: PropTypes.string.isRequired,
  gameDescription: PropTypes.string.isRequired,
  gameRules: PropTypes.string.isRequired,
  gameOpportunityOne: PropTypes.string.isRequired,
  gameOpportunityTwo: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired,
};

export default PresentComponent;
