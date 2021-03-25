import data from '../pages/AudioGame/words.json';

export const SET_AUDIO_GAME_DATA = 'GET_AUDIO_GAME_DATA';
export const SET_AUDIO_GAME_FAKE_DATA = 'SET_AUDIO_GAME_FAKE_DATA';
export const ADD_RIGHT_ANSWER = 'ADD_RIGHT_ANSWER';
export const ADD_WRONG_ANSWER = 'ADD_WRONG_ANSWER';
export const RESET_RIGHT_ANSWERS = 'RESET_RIGHT_ANSWERS';
export const REST_WRONG_ANSWERS = 'REST_WRONG_ANSWERS';

export const setAudioGameData = (audioData) => ({
  type: SET_AUDIO_GAME_DATA,
  audioData,
});

export const setAudioGameFakeData = (audioFakeData) => ({
  type: SET_AUDIO_GAME_FAKE_DATA,
  audioFakeData,
});

export const addRightAnswer = (answer) => ({
  type: ADD_RIGHT_ANSWER,
  answer,
});

export const addWrongAnswer = (answer) => ({
  type: ADD_WRONG_ANSWER,
  answer,
});

export const resetRightAnswers = () => ({ type: RESET_RIGHT_ANSWERS });

export const resetWrongAnswers = () => ({ type: REST_WRONG_ANSWERS });

export const getAudioDataFunc = () => async (dispatch) => {
  const audioData = [];

  for (let i = 0; i < 20; i += 1) {
    audioData.push(data[i]);
  }

  await dispatch(setAudioGameData(audioData));
};

export const getAudioFakeDataFunc = () => async (dispatch) => {
  const audioFakeData = [];

  for (let i = 20; i < 40; i += 1) {
    audioFakeData.push(data[i]);
  }

  await setTimeout(() => {
    dispatch(setAudioGameFakeData(audioFakeData));
  }, 4000);
};
