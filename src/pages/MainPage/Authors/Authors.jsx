import React from 'react';
import style from './Authors.module.scss';
import { data } from './data';
import AuthorCard from './AuthorCard';

const Authors = () => (
  <div className={style.authors}>
    <h3 className={style.authors__h3}>
      Наша команда
    </h3>
    {data.map((elem, index) => (
      <AuthorCard
        name={elem.name}
        text={elem.text}
        isReverse={index % 2 === 0}
      />
    ))}
  </div>
);

export default Authors;
