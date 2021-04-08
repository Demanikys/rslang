import { combineReducers } from 'redux';
import footerReducer from './footerReducer';
import miniGameReducer from './miniGamesReducer';

export default combineReducers({
  footer: footerReducer,
  miniGame: miniGameReducer,
});
