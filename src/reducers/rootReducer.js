import { combineReducers } from 'redux';
import userReducer from './userReducer';
import footerReducer from './footerReducer';
import miniGameReducer from './miniGamesReducer';

export default combineReducers({
  footer: footerReducer,
  miniGame: miniGameReducer,
  user: userReducer,
});
