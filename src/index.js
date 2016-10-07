import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import {BrowserRouter as Router, Match, Miss} from 'react-router';

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

// only load DevTools when not in production mode
let DevTools = null;
if(process.env.NODE_ENV !== 'production') DevTools = require('mobx-react-devtools').default;

ReactDOM.render(
  <Provider {...stores}>
    <Router basename="/mobx-whack-a-mole">
      <div>
        {DevTools ? <DevTools /> : null}
        <Match exactly pattern="/" component={WhackAMole} />
        <Match pattern="/scoreboard" component={ScoreBoard} />
        <Miss component={NotFound}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
