import React from 'react';
import PropTypes from 'prop-types';
import style from './AuthorCard.module.scss';
import GitHubLogo from '../../../../assets/images/GitHubLogo/GitHub-Mark-32px.png';
import AuthorPhoto from '../../../../assets/images/AuthorPhoto/21104.svg';

const AuthorCard = ({
  name, url, text, isReverse,
}) => (
  <div className={style.card}>
    <div className={!isReverse ? `${style.card__block} ${style.card__blockReverse}` : `${style.card__block}`}>
      <div className={style.card__photo}>
        <img src={AuthorPhoto} alt="author" className={style.card__author} />
      </div>
      <div className={style.card__info}>
        <div className={style.card__authorInfo}>
          <div>
            {name}
          </div>
          <div>
            <a href={url}>
              <img src={GitHubLogo} alt="github url" />
            </a>
          </div>
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
  url: PropTypes.string,
  text: PropTypes.string,
  isReverse: PropTypes.bool,
};

AuthorCard.defaultProps = {
  name: 'Author of RSLang',
  url: 'https://github.com/Demanikys/rslang/',
  text: 'Member of a team',
  isReverse: false,
};

export default AuthorCard;
