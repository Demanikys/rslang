import React, { useState } from 'react';
import style from './Authors.module.scss';
import { data } from './data';
import AuthorCard from './AuthorCard';
import one from '../../../assets/photos/one.jpeg';
import two from '../../../assets/photos/two.jpg';

const Authors = () => {
  const [images] = useState([one, two]);

  return (
    <div className={style.authors}>
      <h3 className={style.authors__h3}>
        Наша команда
      </h3>
      {data.map((elem, index) => (
        <AuthorCard
          name={elem.name}
          text={elem.text}
          image={images[index]}
          isReverse={index % 2 === 0}
        />
      ))}
    </div>
  );
};

export default Authors;
