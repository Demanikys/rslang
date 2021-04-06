import { SET_LEVEL } from '../actions/mniGameAction';

const initialState = {
  level: null,
};

const miniGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        level: action.level,
      };
    default:
      return state;
  }
};

export default miniGameReducer;
