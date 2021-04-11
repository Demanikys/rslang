import React from 'react';
import style from './Authors.module.scss';
import { data } from './data';
import AuthorCard from './AuthorCard';

const Authors = () => {
  console.log(data);

  return (
    <div className={style.authors}>
      <h3 className={style.authors__h3}>
        Our team
      </h3>
      {data.map((elem, index) => (
        <AuthorCard
          name={elem.name}
          url={elem.githubUrl}
          text={elem.text}
          isReverse={index % 2 === 0}
        />
      ))}
    </div>
  );
};

export default Authors;
