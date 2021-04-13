import {
  ADD_TO_HARD_WORDS,
  ADD_TO_LEARNED_WORDS,
  ADD_TO_REMOVED_WORDS,
  DELETE_FROM_HARD_WORDS,
  DELETE_FROM_REMOVED_WORDS,
  SET_TO_HARD_WORDS,
  SET_TO_LEARNED_WORDS,
  SET_TO_REMOVE_WORDS,
} from '../actions/dictionaryAction';

const initialState = {
  difficultWords: [],
  deletedWords: [],
  learnedWords: [],
};

const dictionaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TO_LEARNED_WORDS:
      return {
        ...state,
        learnedWords: [...action.array],
      };
    case SET_TO_HARD_WORDS:
      return {
        ...state,
        difficultWords: [...action.array],
      };
    case SET_TO_REMOVE_WORDS:
      return {
        ...state,
        deletedWords: [...action.array],
      };
    case ADD_TO_LEARNED_WORDS:
      return {
        ...state,
        learnedWords: [...state.learnedWords, ...action.words],
      };
    case ADD_TO_HARD_WORDS:
      return {
        ...state,
        difficultWords: [...state.difficultWords, action.word],
      };
    case ADD_TO_REMOVED_WORDS:
      return {
        ...state,
        deletedWords: [...state.deletedWords, action.word],
      };
    case DELETE_FROM_HARD_WORDS:
      return {
        ...state,
        difficultWords: [...action.array],
      };
    case DELETE_FROM_REMOVED_WORDS:
      return {
        ...state,
        deletedWords: [...action.array],
      };
    default:
      return state;
  }
};

export default dictionaryReducer;
