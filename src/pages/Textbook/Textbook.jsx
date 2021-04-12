import React, { useState, useEffect } from 'react';
import {
  Link, Switch, Route, BrowserRouter,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';
import style from './Textbook.module.scss';
import TextbookPageComponent from './TextbookPageComponent';
import Dictionary from './Dictionary';
import { setWordsCollection } from '../../reducers/userReducer';
import TextbookSettings from './Settings';

const Textbook = () => {
  const pagesArray = [1, 2, 3, 4, 5, 6];
  const [pageNumber, setPageNumber] = useState(0);

  const userId = useSelector((state) => state.user.currentUser.userId);
  const dispatch = useDispatch();

  useEffect(async () => {
    const userDeletedList = await firebase.database().ref(`/users/${userId}/deleted`).once('value')
      .then((snapshot) => snapshot.val());
    const userHardList = await firebase.database().ref(`/users/${userId}/hard`).once('value')
      .then((snapshot) => snapshot.val());

    dispatch(setWordsCollection(userDeletedList, userHardList));
  });

  const onPreviousBtnClick = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onNextBtnClick = () => {
    if (pageNumber < 29) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className={style.textbook}>
      <BrowserRouter>
        <ul className={style.textbook_nav}>
          {
                pagesArray.map((item) => (
                  <li key={item}>
                    <Link to={`/textbook/${item}`} onClick={() => setPageNumber(0)}>{`Group ${item}`}</Link>
                  </li>
                ))
            }
          <li>
            <Link to="/textbook/dictionary/learning">Dictionary</Link>
          </li>
          <li>
            <Link to="/textbook/dictionary/settings">settings</Link>
          </li>
        </ul>
        <div className={style.textbook_content}>
          <div className={style.textbook_page_selectors}>
            <button type="button" className={style.page_button} onClick={onPreviousBtnClick}>
              previous
            </button>
            <div>{pageNumber + 1}</div>
            <button type="button" className={style.page_button} onClick={onNextBtnClick}>
              next
            </button>
          </div>
          <Switch>
            {
                pagesArray.map((item, index) => (
                  <Route key={item} path={`/textbook/${item}`}>
                    <TextbookPageComponent
                      groupNumber={index}
                      pageNumber={pageNumber}
                    />
                  </Route>
                ))
            }
            <Route path="/textbook/dictionary/learning">
              <Dictionary />
            </Route>
            <Route path="/textbook/dictionary/settings">
              <TextbookSettings />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Textbook;
