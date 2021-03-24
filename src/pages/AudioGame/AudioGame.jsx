import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ActiveStage from './ActiveStage';
import style from './audioGame.module.scss';
import { getAudioDataFunc, getAudioFakeDataFunc } from '../../actions/audioGameAction';
import { getFakeAudioData, getTruthAudioData } from '../../selectors/selectors';

const AudioGame = () => {
  const [activeStage, setActiveStage] = useState(1);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [correct, setCorrect] = useState('default');
  const words = useSelector(getTruthAudioData);
  const fakeWords = useSelector(getFakeAudioData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAudioDataFunc());
    dispatch(getAudioFakeDataFunc());
  }, []);

  return (
    <div className={style.wrapper}>
      <h2 className={style.header}>Audio game</h2>
      {
        words && (
        <ActiveStage
          word={words[activeStage]}
          fakeWords={fakeWords}
          correct={correct}
          setCorrect={setCorrect}
          setNextBtnStatus={setNextBtnStatus}
        />
        )
      }
      {
        !nextBtnStatus && (
        <Button
          onClick={() => {
            setNextBtnStatus(true);
            setCorrect('wrong');
          }}
          variant="warning"
        >
          Don&apos;t know
        </Button>
        )
      }
      {
        nextBtnStatus && (
        <Button
          onClick={() => {
            setActiveStage(activeStage + 1);
            setNextBtnStatus(false);
            setCorrect('default');
          }}
          variant="warning"
        >
          Next
        </Button>
        )
      }
    </div>
  );
};

export default AudioGame;
