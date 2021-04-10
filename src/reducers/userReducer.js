const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

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
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const logout = () => ({ type: LOGOUT });

export default usersReducer;
