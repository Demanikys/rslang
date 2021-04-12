import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toggleShowStatus from '../../actions/footerAction';
import Description from './Description';
import Video from './Video';
import Authors from './Authors';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleShowStatus(true));
  }, []);

  return (
    <div>
      <Description />
      <Video />
      <Authors />
    </div>
  );
};

export default MainPage;
