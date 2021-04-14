export const SET_LEVEL = 'SET_LEVEL';
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const SET_GROUP_NUMBER = 'SET_GROUP_NUMBER';
export const SET_GAME_FROM_TEXTBOOK = 'SET_GAME_FROM_TEXTBOOK';
export const SET_WORDS_FROM_DICTIONARY = 'SET_WORDS_FROM_DICTIONARY';
export const SET_WORDS_FROM_TEXTBOOK = 'SET_WORDS_FROM_TEXTBOOK';
export const SET_GAME_FROM_DICTIONARY = 'SET_GAME_FROM_DICTIONARY';

const setGameLevel = (level) => ({
  type: SET_LEVEL,
  level,
});

export const setGamePage = (page) => ({
  type: SET_PAGE_NUMBER,
  page,
});

export const setGameGroup = (group) => ({
  type: SET_GROUP_NUMBER,
  group,
});

export const setGameFromTextbookStatus = (status) => ({
  type: SET_GAME_FROM_TEXTBOOK,
  status,
});

export const setGameFromDictionaryStatus = (status) => ({
  type: SET_GAME_FROM_DICTIONARY,
  status,
});

export const setWordsFromDictionary = (array) => ({
  type: SET_WORDS_FROM_DICTIONARY,
  array,
});

export const setWordsFromTextbook = (array) => ({
  type: SET_WORDS_FROM_TEXTBOOK,
  array,
});

export default setGameLevel;
