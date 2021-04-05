import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toggleShowStatus from '../../actions/footerAction';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleShowStatus(true));
  }, []);

  return (
    <div>
      this is main page
    </div>
  );
};

export default MainPage;
