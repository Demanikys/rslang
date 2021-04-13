import React, { useEffect, useState } from 'react';
import {
  Link, Switch, Route, BrowserRouter,
} from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import style from './Textbook.module.scss';
import TextbookPageComponent from './TextbookPageComponent';
import Dictionary from './Dictionary';
import { setHardWords, setRemoveWords } from '../../actions/dictionaryAction';
import { getDeletedWords, getDifficultWords, getUserId } from '../../selectors/selectors';
import { setUserData } from '../../actions/userActions';

const Textbook = () => {
  const userId = useSelector(getUserId);
  const difficultWords = useSelector(getDifficultWords);
  const deletedWords = useSelector(getDeletedWords);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const pagesArray = [1, 2, 3, 4, 5, 6];

  useEffect(async () => {
    if (difficultWords.length === 0 && deletedWords.length === 0) {
      if (userId) {
        await firebase.database().ref(`/users/${userId}/deleted`).once('value')
          .then((snapshot) => snapshot.val())
          .then((res) => dispatch(setRemoveWords(res || [])));

        await firebase.database().ref(`/users/${userId}/hard`).once('value')
          .then((snapshot) => snapshot.val())
          .then((res) => dispatch(setHardWords(res || [])));

        setIsFetching(true);
      }
    } else {
      setIsFetching(true);
    }
  }, [userId]);

  useEffect(() => {
    if (difficultWords.length > 0) {
      setUserData(userId, difficultWords, 'hard');
    }
  }, [difficultWords]);

  useEffect(() => {
    if (deletedWords.length > 0) {
      setUserData(userId, deletedWords, 'deleted');
    }
  }, [deletedWords]);

  // [{
  //   audio: 'files/01_0005.mp3',
  //   audioExample: 'files/01_0005_example.mp3',
  //   audioMeaning: 'files/01_0005_meaning.mp3',
  //   group: 0,
  //   id: '5e9f5ee35eb9e72bc21af4a2',
  //   image: 'files/01_0005.jpg',
  //   page: 0,
  //   textExample: 'There is a small <b>boat</b> on the lake.',
  //   textExampleTranslate: 'На озере есть маленькая лодка',
  //   textMeaning: 'A <i>boat</i> is a vehicle that moves across water.',
  //   textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
  //   transcription: '[bout]',
  //   word: 'boat',
  //   wordTranslate: 'лодка',
  // }]
  console.log(userId, 'id');

  return (
    isFetching
      ? (
        <div className={style.textbook}>
          <BrowserRouter>
            <ul className={style.textbook_nav}>
              {
                pagesArray.map((item) => (
                  <li key={item}>
                    <Link id={item} to={`/textbook/${item}`}>{`Group ${item}`}</Link>
                  </li>
                ))
              }
              <li>
                <Link to="/textbook/dictionary/learning">Dictionary</Link>
              </li>
            </ul>
            <div className={style.textbook_content}>
              <Switch>
                {
                  pagesArray.map((item, index) => (
                    <Route key={item} path={`/textbook/${item}`}>
                      <TextbookPageComponent
                        groupNumber={index}
                      />
                    </Route>
                  ))
                }
                <Route path="/textbook/dictionary/learning">
                  <Dictionary pageNumber={1} />
                </Route>
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      )
      : (
        <div>Loader</div>
      )
  );
};

export default Textbook;
