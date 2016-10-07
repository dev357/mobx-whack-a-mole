import React from 'react';
import styles from './WhackAMole.css';
import {observer} from 'mobx-react';

import {Link} from 'react-router';
import Mole from './Mole';

function WhackAMole({whackAMole}) {
  const startGame = () => {
    if (whackAMole.name === "") this._input.focus();
    whackAMole.startGame(10, 1);
  };
  const changeName = e => whackAMole.setName(e.target.value);

  const renderMole = (mole, index) => <Mole key={index} mole={mole}/>;

  return (
    <div className={styles.game}>
      <h1>Whack-A-Mole</h1>
      <div className={styles.startArea}>
        <input
          type="text"
          placeholder="name"
          value={whackAMole.name}
          onChange={changeName}
          ref={(c) => this._input = c}
        />
        <div className={styles.startButton} onClick={startGame}>
          <TimeDisplay timeToGo={whackAMole.timeToGo} isRunning={whackAMole.isRunning}/>
        </div>
      </div>
      <div className={styles.table}>
        <div>
          {whackAMole.moles.map(renderMole)}
        </div>
      </div>
      <ScoreDisplay totalActive={whackAMole.totalActive}/>
    </div>
  )
}

export const TimeDisplay = observer(({timeToGo, isRunning}) => (
  <p>{isRunning
    ? 'Time: ' + timeToGo
    : 'START'}
  </p>
));

export const ScoreDisplay = observer(({totalActive}) => (
  <div className={styles.score}>
    <div>{totalActive} ms</div>
    <div><Link to="/scoreboard" className={styles.scoreboard}>Scoreboard</Link></div>
  </div>
));

export default observer(["whackAMole"], WhackAMole);
