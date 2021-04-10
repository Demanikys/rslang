import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const registration = async (email, password, name) => {
  try {
    await axios.post('https://newrslangapi.herokuapp.com/users', {
      email,
      password,
      name,
    });
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      'https://newrslangapi.herokuapp.com/signin',
      {
        email,
        password,
      },
    );
    dispatch(setUser(response.data));
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const auth = () => async (dispatch) => {
  const response = localStorage.getItem('user');
  if (response) {
    dispatch(setUser(JSON.parse(response)));
  }
};
