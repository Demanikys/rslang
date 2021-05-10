import React, { useState } from 'react';
import {
  BrowserRouter, Link, Route, Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './Dictionary.module.scss';
import DictionaryPageComponent from './DictionaryPageComponent';
import {
  getDeletedWords, getDifficultWords, getLearnedWords, getType, getUserAuth,
} from '../../../selectors/selectors';
import withDictionaryPage from '../../../hoc/withDictionaryPage';
import Games from '../Games/Games';

const Dictionary = () => {
  const learnedWords = useSelector(getLearnedWords);
  const difficultWords = useSelector(getDifficultWords);
  const deletedWords = useSelector(getDeletedWords);
  const type = useSelector(getType);
  const [pageNumber, setPageNumber] = useState(1);
  const [topic, setTopic] = useState(1);
  const isAuth = useSelector(getUserAuth);
  const topics = [1, 2, 3, 4, 5, 6].map((i) => (
    <span
      onClick={() => {
        setTopic(i);
        setPageNumber(1);
      }}
    >
      {i}
    </span>
  ));

  return (
    isAuth ? (
      <div>
        <BrowserRouter>
          <div className={style.dictionary_nav}>
            <Link to="/textbook/dictionary/learning">Изучаемые слова</Link>
            <Link to="/textbook/dictionary/hard">Сложные слова</Link>
            <Link to="/textbook/dictionary/deleted">Удаленные слова</Link>
          </div>
          <div className={style.dictionary_content}>
            <Switch>
              <Route path="/textbook/dictionary/learning">
                {withDictionaryPage(DictionaryPageComponent)({
                  topic,
                  words: learnedWords,
                  type: 'learnedWords',
                  difficultWords,
                  pageNumber,
                  setPageNumber,
                })}
              </Route>
              <Route path="/textbook/dictionary/hard">
                <div className={style.topic}>
                  {topics}
                </div>
                {withDictionaryPage(DictionaryPageComponent)({
                  topic,
                  words: difficultWords,
                  type: 'hardWord',
                  difficultWords,
                  pageNumber,
                  setPageNumber,
                })}
              </Route>
              <Route path="/textbook/dictionary/deleted">
                <div className={style.topic}>
                  {topics}
                </div>
                {withDictionaryPage(DictionaryPageComponent)({
                  topic,
                  words: deletedWords,
                  type: 'deletedWord',
                  difficultWords: [{}],
                  pageNumber,
                  setPageNumber,
                })}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
        {type !== 'learnedWords'
        && <Games type={type} />}
      </div>
    )
      : (
        <div className={style.registerPlease}>
          Пожалуйста, зарегистрируйтесь!
        </div>
      )
  );
};

export default Dictionary;
