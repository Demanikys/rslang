import { combineReducers } from 'redux';
import userReducer from './userReducer';
import footerReducer from './footerReducer';
import miniGameReducer from './miniGamesReducer';
import dictionaryReducer from './dictionaryReducer';

export default combineReducers({
  footer: footerReducer,
  miniGame: miniGameReducer,
  dictionary: dictionaryReducer,
  user: userReducer,
});
