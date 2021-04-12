import React from 'react';
import PropTypes from 'prop-types';
import style from './AuthorCard.module.scss';
import AuthorPhoto from '../../../../assets/images/AuthorPhoto/21104.svg';

const AuthorCard = ({
  name, text, isReverse,
}) => (
  <div className={style.card}>
    <div className={!isReverse ? `${style.card__block} ${style.card__blockReverse}` : `${style.card__block}`}>
      <div className={style.card__photo}>
        <img src={AuthorPhoto} alt="author" className={style.card__author} />
      </div>
      <div className={style.card__info}>
        <div className={style.card__authorInfo}>
          <b>{name}</b>
        </div>
        <div className={style.card__desc}>
          {text}
        </div>
      </div>
    </div>
  </div>
);

AuthorCard.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  isReverse: PropTypes.bool,
};

AuthorCard.defaultProps = {
  name: 'Author of RSLang',
  text: 'Member of a team',
  isReverse: false,
};

export default AuthorCard;
