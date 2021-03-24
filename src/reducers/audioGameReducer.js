import { SET_AUDIO_GAME_DATA, SET_AUDIO_GAME_FAKE_DATA } from '../actions/audioGameAction';

const initialState = {
  truthData: null,
  fakeData: null,
  goodAnswers: 0,
  badAnswers: 0,
};

const audioGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO_GAME_DATA:
      return {
        ...state,
        truthData: action.audioData,
      };
    case SET_AUDIO_GAME_FAKE_DATA:
      return {
        ...state,
        fakeData: action.audioFakeData,
      };
    default:
      return state;
  }
};

export default audioGameReducer;
