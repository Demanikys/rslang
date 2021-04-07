import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toggleShowStatus from '../../actions/footerAction';
import NavigationBlock from './NavigationBlock/NavigationBlock';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleShowStatus(true));
  }, []);

  return (
    <div>
      <NavigationBlock />
    </div>
  );
};

export default MainPage;
