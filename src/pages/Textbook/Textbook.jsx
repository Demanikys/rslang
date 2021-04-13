import React from 'react';
import {
  Link, Switch, Route, BrowserRouter,
} from 'react-router-dom';
import style from './Textbook.module.scss';
import TextbookPageComponent from './TextbookPageComponent';
import Dictionary from './Dictionary';

const Textbook = () => {
  const pagesArray = [1, 2, 3, 4, 5, 6];

  return (
    <div className={style.textbook}>
      <BrowserRouter>
        <ul className={style.textbook_nav}>
          {
            pagesArray.map((item) => (
              <li key={Math.random()}>
                <Link to={`/textbook/${item}`}>{`Group ${item}`}</Link>
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
  );
};

export default Textbook;

// useEffect(async () => {
//   const userDeletedList = await firebase.database().ref(`/users/${userId}/deleted`).once('value')
//     .then((snapshot) => snapshot.val());
//   const userHardList = await firebase.database().ref(`/users/${userId}/hard`).once('value')
//     .then((snapshot) => snapshot.val());
//
//   dispatch(setWordsCollection(userDeletedList, userHardList));
// });
