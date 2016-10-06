import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import {BrowserRouter as Router, Match, Miss} from 'react-router';
import DevTools from 'mobx-react-devtools';

import './index.css';
useStrict(true);

import NotFound from './NotFound';
import WhackAMole from './WhackAMole';
import whackAMoleStore from './WhackAMoleStore';
import ScoreBoard from './ScoreBoard';
import scoreBoardStore from './ScoreBoardStore';

const stores = {
  scoreBoard: scoreBoardStore,
  whackAMole: whackAMoleStore
};

ReactDOM.render(
  <Provider {...stores}>
    <Router basename="/mobx-whack-a-mole">
      <div>
        <DevTools />
        <Match exactly pattern="/" component={WhackAMole} />
        <Match pattern="/scoreboard" component={ScoreBoard} />
        <Miss component={NotFound}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
