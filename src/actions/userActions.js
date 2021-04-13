import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';

import { setUser } from '../reducers/userReducer';

export const registration = async (email, password, name) => {
  try {
    await axios.post('https://newrslangapi.herokuapp.com/users', {
      email,
      password,
      name,
    });
  } catch (e) {
    console.log(e.response.data.message);
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
    console.log(e.response.data.message);
  }
};

export const auth = () => async (dispatch) => {
  const response = localStorage.getItem('user');
  if (response) {
    console.log(response, 'response');
    dispatch(setUser(JSON.parse(response)));
  }
};

export const setUserData = (userId, array, typeOfCollection) => {
  console.log(typeof userId, [...array], typeOfCollection, 'setau null');
  firebase.database().ref(`users/${userId}/${typeOfCollection}`).set(
    [...array],
  ).catch((err) => console.log(err));
};
