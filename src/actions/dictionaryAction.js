export const ADD_TO_LEARNED_WORDS = 'ADD_TO_LEARNED_WORDS';
export const ADD_TO_HARD_WORDS = 'ADD_TO_HARD_WORDS';
export const ADD_TO_REMOVED_WORDS = 'ADD_TO_REMOVED_WORDS';
export const DELETE_FROM_HARD_WORDS = 'DELETE_FROM_HARD_WORDS';
export const DELETE_FROM_REMOVED_WORDS = 'DELETE_FROM_REMOVED_WORDS';
export const SET_TO_LEARNED_WORDS = 'SET_TO_LEARNED_WORDS';
export const SET_TO_HARD_WORDS = 'SET_TO_LEARNED_WORDS';
export const SET_TO_REMOVE_WORDS = 'SET_TO_LEARNED_WORDS';

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

export const deleteFromHardWords = (array) => ({
  type: DELETE_FROM_HARD_WORDS,
  array,
});

export const deleteFromRemovedWords = (array) => ({
  type: DELETE_FROM_REMOVED_WORDS,
  array,
});

export const setLearnedWords = (array) => ({
  type: SET_TO_LEARNED_WORDS,
  array,
});

export const setHardWords = (array) => ({
  type: SET_TO_HARD_WORDS,
  array,
});

export const setRemoveWords = (array) => ({
  type: SET_TO_REMOVE_WORDS,
  array,
});

export default addNewLearnedWords;
