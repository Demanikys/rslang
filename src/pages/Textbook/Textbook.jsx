import React, { useEffect, useState } from 'react';
import {
  Link, Switch, Route,
} from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import style from './Textbook.module.scss';
import TextbookPageComponent from './TextbookPageComponent';
import Dictionary from './Dictionary';
import { setHardWords, setRemoveWords } from '../../actions/dictionaryAction';
import { getDeletedWords, getDifficultWords, getUserId } from '../../selectors/selectors';
import { setUserData } from '../../actions/userActions';
import { setGameFromTextbookStatus } from '../../actions/mniGameAction';

const Textbook = () => {
  const userId = useSelector(getUserId);
  const difficultWords = useSelector(getDifficultWords);
  const deletedWords = useSelector(getDeletedWords);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const pagesArray = [1, 2, 3, 4, 5, 6];

  useEffect(async () => {
    dispatch(setGameFromTextbookStatus(true));
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

  return (
    isFetching
      ? (
        <div className={style.textbook}>
          <ul className={style.textbook_nav}>
            {
                pagesArray.map((item) => (
                  <li key={item}>
                    <Link id={item} to={`/textbook/${item}`}>{`Group ${item}`}</Link>
                  </li>
                ))
              }
            <li>
              <Link to="/textbook/dictionary/learning">Словарь</Link>
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
        </div>
      )
      : (
        <div>Loader</div>
      )
  );
};

export default Textbook;
