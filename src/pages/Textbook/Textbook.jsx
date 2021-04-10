import React, { useState } from 'react';
import {
  Link, Switch, Route, BrowserRouter,
} from 'react-router-dom';
import style from './Textbook.module.scss';
import TextbookPageComponent from './TextbookPageComponent';
import Dictionary from './Dictionary';

const Textbook = () => {
  const pagesArray = [1, 2, 3, 4, 5, 6];
  const [pageNumber, setPageNumber] = useState(0);

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
                  <li key={Math.random()}>
                    <Link to={`/textbook/${item}`} onClick={() => setPageNumber(0)}>{`Group ${item}`}</Link>
                  </li>
                ))
            }
          <li>
            <Link to="/textbook/dictionary/learning">Dictionary</Link>
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
                  <Route key={Math.random()} path={`/textbook/${item}`}>
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
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Textbook;
