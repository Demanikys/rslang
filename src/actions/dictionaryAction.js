export const ADD_TO_LEARNED_WORDS = 'ADD_TO_LEARNED_WORDS';
export const ADD_TO_HARD_WORDS = 'ADD_TO_HARD_WORDS';
export const ADD_TO_REMOVED_WORDS = 'ADD_TO_REMOVED_WORDS';

const addNewLearnedWords = (words) => ({
  type: ADD_TO_LEARNED_WORDS,
  words,
});

export const addNewHardWord = (word) => ({
  type: ADD_TO_HARD_WORDS,
  word,
});

export const addNewRemovedWord = (word) => ({
  type: ADD_TO_REMOVED_WORDS,
  word,
});

export default addNewLearnedWords;
