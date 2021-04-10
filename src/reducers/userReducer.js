const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const SET_WORDS_COLLECTION = 'SET_WORDS_COLLECTION';

const initialState = {
  currentUser: {},
  isAuth: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };
    case SET_WORDS_COLLECTION:
      return {
        ...state,
        deletedWords: action.payload.deleted,
        hardWords: action.payload.hard,
      };
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const logout = () => ({ type: LOGOUT });

export const setWordsCollection = (deleted, hard) => ({
  type: SET_WORDS_COLLECTION,
  payload: {
    deleted,
    hard,
  },
});

export default usersReducer;
