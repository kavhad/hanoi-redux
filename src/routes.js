import React from 'react';
import {Route} from 'react-router';
import App from './App';
import Game from './components/Game/Game';

const Routes = () => (
  <App>
    <Route path="/" component={Game} />
  </App>
);

export default Routes;
