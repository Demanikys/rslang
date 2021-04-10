import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import style from './Dictionary.module.scss';
import DictionaryPageComponent from './DictionaryPageComponent';
import 'firebase/database';

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
            <DictionaryPageComponent type="hardWord" />
          </Route>
          <Route path="/textbook/dictionary/deleted">
            <DictionaryPageComponent type="deletedWord" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default Dictionary;
