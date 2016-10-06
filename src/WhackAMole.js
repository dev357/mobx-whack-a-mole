import React from 'react';
import styles from './WhackAMole.css';
import {observer} from 'mobx-react';

import {Link} from 'react-router';
import Mole from './Mole';

function WhackAMole({whackAMole}) {
  const startGame = () => whackAMole.startGame(10, 1);
  const changeName = e => whackAMole.setName(e.target.value);

  const renderMole = (mole, index) => <Mole key={index} mole={mole} />;

  return <div className={styles.game}>
    <h1>Whack-A-Mole</h1>
    <div className={styles.startArea}>
      <input type="text" placeholder="name" onChange={changeName}/>
      <div className={styles.startButton} onClick={startGame}>
        <TimeDisplay timeToGo={whackAMole.timeToGo} isRunning={whackAMole.isRunning}/>
      </div>
    </div>
    <div className={styles.table}>
      {whackAMole.moles.map(renderMole)}
    </div>
    <ScoreDisplay totalActive={whackAMole.totalActive}/>
  </div>
}

export const TimeDisplay = observer(({timeToGo, isRunning}) => (
  <p>{isRunning
    ? 'Time: ' + timeToGo
    : 'START'}
  </p>
));

export const ScoreDisplay = observer(({totalActive}) => (
  <div className={styles.score}>
    <span>{totalActive} ms</span>
    <Link to="/scoreboard" className={styles.scoreboard}>Scoreboard</Link>
  </div>
));

export default observer(["whackAMole"], WhackAMole);
