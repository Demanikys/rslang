import { ADD_TO_HARD_WORDS, ADD_TO_LEARNED_WORDS, ADD_TO_REMOVED_WORDS } from '../actions/dictionaryAction';

const initialState = {
  difficultWords: [],
  deletedWords: [],
  learnedWords: [],
};

const dictionaryReducer = (state = initialState, action) => {
  console.log(state.deletedWords);
  switch (action.type) {
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
    default:
      return state;
  }
};

export default dictionaryReducer;
