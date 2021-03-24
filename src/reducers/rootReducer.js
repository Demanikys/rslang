import { combineReducers } from 'redux';
import audioGameReducer from './audioGameReducer';

export default combineReducers({
  audio: audioGameReducer,
});
