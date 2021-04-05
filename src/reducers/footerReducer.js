import { TOGGLE_SHOW } from '../actions/footerAction';

const initialState = {
  show: true,
};

const footerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SHOW:
      return {
        ...state,
        show: action.status,
      };
    default:
      return state;
  }
};

export default footerReducer;
