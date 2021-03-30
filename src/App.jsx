import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AudioGame from './pages/AudioGame';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import Menu from './components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GameSavanna from './pages/GameSavanna'
import Textbook from './pages/Textbook'

const App = () => (
  <BrowserRouter>
    <div>
      <Menu />
      <Switch>
        <Route path="/audio-game">
          <AudioGame />
        </Route>
        <Route path="/savanna-game">
          <GameSavanna />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path='/textbook'>
          <Textbook />
        </Route>
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
