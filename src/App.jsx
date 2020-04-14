import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import '@Styles/App.scss';

import { Home } from '@Pages';
import { GameFactory } from '@Elements';

export default class App extends PureComponent {
  render() {
    return (
      <GameFactory>
        <div className="app">
          <Home />
        </div>
      </GameFactory>
    );
  }
}
