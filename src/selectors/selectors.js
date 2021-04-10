/* eslint-disable import/prefer-default-export */

export const getShowFooterStatus = (state) => state.footer.show;
export const getMiniGameLevel = (state) => state.miniGame.level;
export const getLearnedWords = (state) => state.dictionary.learnedWords;
export const getDeletedWords = (state) => state.dictionary.deletedWords;
export const getDifficultWords = (state) => state.dictionary.difficultWords;
