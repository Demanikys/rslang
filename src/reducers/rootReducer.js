import { combineReducers } from 'redux';
import userReducer from './userReducer';
import footerReducer from './footerReducer';
import miniGameReducer from './miniGamesReducer';
import textbookReducer from './textbookReducer';

export default combineReducers({
  footer: footerReducer,
  miniGame: miniGameReducer,
  user: userReducer,
  textbook: textbookReducer,
});
