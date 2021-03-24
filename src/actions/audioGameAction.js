import data from '../pages/AudioGame/words.json';

export const SET_AUDIO_GAME_DATA = 'GET_AUDIO_GAME_DATA';
export const SET_AUDIO_GAME_FAKE_DATA = 'SET_AUDIO_GAME_FAKE_DATA';

const setAudioGameData = (audioData) => ({
  type: SET_AUDIO_GAME_DATA,
  audioData,
});

const setAudioGameFakeData = (audioFakeData) => ({
  type: SET_AUDIO_GAME_FAKE_DATA,
  audioFakeData,
});

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

  await dispatch(setAudioGameFakeData(audioFakeData));
};
