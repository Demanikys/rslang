import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AudioGame from './pages/AudioGame';
import Footer from './components/Footer';
import Sprint from './pages/Sprint';
import MainPage from './pages/MainPage';
import Menu from './components/Menu';
import Login from './pages/Login';
import Registration from './pages/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StartGallowsGame from './pages/GallowsGame';
import GameSavanna from './pages/GameSavanna';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './actions/userActions';

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(auth());
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Switch>
          <Route path='/registration'>
            <Registration />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/audio-game'>
            <AudioGame />
          </Route>
          <Route path='/sprint'>
            <Sprint />
          </Route>
          <Route path='/gallows-game'>
            <StartGallowsGame />
          </Route>
          <Route path='/savanna-game'>
            <GameSavanna />
          </Route>
          <Route path='/'>
            <MainPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
