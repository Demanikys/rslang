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
import { getDeletedWords, getDifficultWords } from '../../selectors/selectors';
import { setUserData } from '../../actions/userActions';

const Textbook = () => {
  const userId = useSelector((state) => state.user.currentUser.userId);
  const difficultWords = useSelector(getDifficultWords);
  const deletedWords = useSelector(getDeletedWords);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const pagesArray = [1, 2, 3, 4, 5, 6];

  useEffect(async () => {
    console.log(userId);
    if (difficultWords.length === 0 && deletedWords.length === 0) {
      const userDeletedList = await firebase.database().ref(`/users/${userId}/deleted`).once('value')
        .then((snapshot) => snapshot.val());
      const userHardList = await firebase.database().ref(`/users/${userId}/hard`).once('value')
        .then((snapshot) => snapshot.val());

      dispatch(setHardWords(userHardList ?? []));
      dispatch(setRemoveWords(userDeletedList ?? []));
      setIsFetching(true);
    } else {
      setIsFetching(true);
    }
  }, []);

  useEffect(() => {
    setUserData(userId, difficultWords, 'hard');
  }, [difficultWords]);

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
