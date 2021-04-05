import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import style from './Dictionary.module.scss';
import DictionaryPageComponent from './DictionaryPageComponent';

const Dictionary = () => (
  <div>
    <BrowserRouter>
      <div className={style.dictionary_nav}>
        <Link to="/textbook/dictionary/learning">Изучаемые слова</Link>
        <Link to="/textbook/dictionary/hard">Сложные слова</Link>
        <Link to="/textbook/dictionary/deleted">Удаленные слова</Link>
      </div>
      <div className={style.dictionary_content}>
        <Switch>
          <Route path="/textbook/dictionary/learning" />
          <Route path="/textbook/dictionary/hard">
            {
              localStorage.getItem('userHardWords') && (JSON.parse(localStorage.getItem('userHardWords')).lenght !== 0)
                ? <DictionaryPageComponent words={JSON.parse(localStorage.getItem('userHardWords'))} type="hardWord" />
                : null
            }
          </Route>
          <Route path="/textbook/dictionary/deleted">
            {
              localStorage.getItem('userDeletedWords') && (JSON.parse(localStorage.getItem('userDeletedWords')).lenght !== 0)
                ? <DictionaryPageComponent words={JSON.parse(localStorage.getItem('userDeletedWords'))} type="deletedWord" />
                : null
            }
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default Dictionary;
