import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import WhackAMole from './WhackAMole';
import whackAMoleStore from './WhackAMoleStore';

import './index.css';

useStrict(true);

ReactDOM.render(
  <Provider whackAMole={whackAMoleStore}>
    <WhackAMole />
  </Provider>,
  document.getElementById('root')
);
