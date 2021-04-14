/* eslint-disable import/prefer-default-export */

export const getShowFooterStatus = (state) => state.footer.show;
export const getMiniGameLevel = (state) => state.miniGame.level;
export const getLearnedWords = (state) => state.dictionary.learnedWords;
export const getDeletedWords = (state) => state.dictionary.deletedWords;
export const getDifficultWords = (state) => state.dictionary.difficultWords;
export const getUserId = (state) => state.user.currentUser.userId;
export const getGameFromTextbookStatus = (state) => state.miniGame.fromTextbook;
export const getGamePageNumber = (state) => state.miniGame.pageNumber;
export const getGameGroupNumber = (state) => state.miniGame.groupNumber;
export const getGameFromDictStatus = (state) => state.miniGame.fromDictionary;
export const getGameWordsFromDict = (state) => state.miniGame.wordsFromDictionary;
export const getGameWordsFromTextbook = (state) => state.miniGame.wordsFromTextbook;
export const getType = (state) => state.dictionary.type;
export const getUserAuth = (state) => state.user.isAuth;
export const getTranslateVisibility = (state) => state.textbook.showTranslate;
export const getButtonsVisibility = (state) => state.textbook.showButtons;
