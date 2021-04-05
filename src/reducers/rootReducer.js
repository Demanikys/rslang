import { combineReducers } from 'redux';
import footerReducer from './footerReducer';

export default combineReducers({
  footer: footerReducer,
});
