import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toggleShowStatus from '../../actions/footerAction';
import Description from './Description';
import Video from './Video';
import Authors from './Authors';
import style from './mainPage.module.scss';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleShowStatus(true));
  }, []);

  return (
    <div className={style.mainPage}>
      <Description />
      <Video />
      <Authors />
    </div>
  );
};

export default MainPage;
