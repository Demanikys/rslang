import React, { useEffect, useState } from 'react';
import {
  Link, Switch, Route, BrowserRouter,
} from 'react-router-dom';
import style from './Textbook.module.scss';
import TextbookPageComponent from './TextbookPageComponent';
import Dictionary from './Dictionary';
import Pagination from '../../components/Pagination';

const Textbook = () => {
  const pagesArray = [1, 2, 3, 4, 5, 6];
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => setPageNumber(1), []);

  return (
    <div className={style.textbook}>
      <BrowserRouter>
        <ul className={style.textbook_nav}>
          {
            pagesArray.map((item) => (
              <li key={Math.random()}>
                <Link to={`/textbook/${item}`} onClick={() => setPageNumber(1)}>{`Group ${item}`}</Link>
              </li>
            ))
          }
          {/* <li> */}
          {/*  <Link to="/textbook/dictionary/learning">Dictionary</Link> */}
          {/* </li> */}
        </ul>
        <div className={style.textbook_content}>
          <Pagination setPageNumber={setPageNumber} />
          <Switch>
            {
              pagesArray.map((item, index) => (
                <Route key={item} path={`/textbook/${item}`}>
                  <TextbookPageComponent
                    groupNumber={index}
                    pageNumber={pageNumber - 1}
                  />
                </Route>
              ))
            }
            <Route path="/textbook/dictionary/learning">
              <Dictionary />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Textbook;
