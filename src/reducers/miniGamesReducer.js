import {
  SET_GAME_FROM_DICTIONARY,
  SET_GAME_FROM_TEXTBOOK,
  SET_GROUP_NUMBER, SET_LEVEL,
  SET_PAGE_NUMBER,
  SET_WORDS_FROM_DICTIONARY,
} from '../actions/mniGameAction';

const initialState = {
  level: null,
  fromTextbook: false,
  pageNumber: null,
  groupNumber: null,
  wordsFromDictionary: null,
  fromDictionary: false,
};

const miniGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        level: action.level,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.page,
      };
    case SET_GROUP_NUMBER:
      return {
        ...state,
        groupNumber: action.group,
      };
    case SET_GAME_FROM_TEXTBOOK:
      return {
        ...state,
        fromTextbook: action.status,
      };
    case SET_WORDS_FROM_DICTIONARY:
      return {
        ...state,
        wordsFromDictionary: [...action.array],
      };
    case SET_GAME_FROM_DICTIONARY:
      return {
        ...state,
        fromDictionary: action.status,
      };
    default:
      return state;
  }
};

export default miniGameReducer;
