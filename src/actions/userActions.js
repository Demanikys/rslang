import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';
// eslint-disable-next-line import/no-cycle
// import store from '../index';
import { setUser /* , setWordsCollection */ } from '../reducers/userReducer';

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
    dispatch(setUser(JSON.parse(response)));
  }
};

// export const userWordsDataSet = async (userId, wordId, typeOfCollection) => {
//   const userList = await firebase.database().
//   ref(`/users/${userId}/${typeOfCollection}`).once('value')
//     .then((snapshot) => snapshot.val());
//
//   if (userList) {
//     firebase.database().ref(`users/${userId}/${typeOfCollection}`).set(
//       [...userList, wordId],
//     );
//   } else {
//     firebase.database().ref(`users/${userId}/${typeOfCollection}`).set(
//       [wordId],
//     );
//   }
// };
//
// export const userWordsDataRemove = async (userId, wordId, typeOfCollection) => {
//   const userList = await firebase.database().
//   ref(`/users/${userId}/${typeOfCollection}`).once('value')
//     .then((snapshot) => snapshot.val());
//
//   userList.forEach((item, index) => {
//     if (item === wordId) {
//       userList.splice(index, 1);
//     }
//   });
//
//   firebase.database().ref(`users/${userId}/${typeOfCollection}`).set(
//     [...userList],
//   );
// };

export const setUserData = (userId, array, typeOfCollection) => {
  console.log(userId, array, typeOfCollection);
  firebase.database().ref(`users/${userId}/${typeOfCollection}`).set(
    [...array],
  ).then(() => console.log('stanul'));
};
