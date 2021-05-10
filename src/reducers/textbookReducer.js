const CHANGE_TRANSLATE_VISIBILITY = 'CHANGE_TRANSLATE_VISIBILITY';
const CHANGE_BUTTONS_VISIBILITY = 'CHANGE_BUTTONS_VISIBILITY';

const initialState = {
  showTranslate: true,
  showButtons: true,
};

const textbookReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TRANSLATE_VISIBILITY:
      return {
        ...state,
        showTranslate: action.payload,
      };

    case CHANGE_BUTTONS_VISIBILITY:
      return {
        ...state,
        showButtons: action.payload,
      };
    default:
      return state;
  }
};

export default textbookReducer;

export const changeTranslateVis = (state) => ({
  type: CHANGE_TRANSLATE_VISIBILITY,
  payload: state,
});

export const changeButtonsVis = (state) => ({
  type: CHANGE_BUTTONS_VISIBILITY,
  payload: state,
});
