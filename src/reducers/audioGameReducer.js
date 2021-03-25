import {
  ADD_RIGHT_ANSWER,
  ADD_WRONG_ANSWER, RESET_RIGHT_ANSWERS, REST_WRONG_ANSWERS,
  SET_AUDIO_GAME_DATA,
  SET_AUDIO_GAME_FAKE_DATA,
} from '../actions/audioGameAction';

const initialState = {
  truthData: null,
  fakeData: null,
  goodAnswers: 0,
  badAnswers: 0,
  rightAnswers: [],
  wrongAnswers: [],
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
    case ADD_RIGHT_ANSWER:
      return {
        ...state,
        rightAnswers: [...state.rightAnswers, action.answer],
      };
    case ADD_WRONG_ANSWER:
      return {
        ...state,
        wrongAnswers: [...state.wrongAnswers, action.answer],
      };
    case RESET_RIGHT_ANSWERS:
      return {
        ...state,
        rightAnswers: [],
      };
    case REST_WRONG_ANSWERS:
      return {
        ...state,
        wrongAnswers: [],
      };
    default:
      return state;
  }
};

export default audioGameReducer;
