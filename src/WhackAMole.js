import React from 'react';
import styles from './WhackAMole.css';
import {observer} from 'mobx-react';

import Mole from './Mole';

function WhackAMole({whackAMole}) {
  const startGame = () => whackAMole.startGame(10, 1);

  return <div className={styles.game}>
    <h1 onClick={startGame}>Whack-A-Mole</h1>
    <div className={styles.startButton} onClick={startGame}>
      <TimeDisplay />
    </div>
    <div className={styles.table}>
      {whackAMole.moles.map((mole, index) => <Mole key={index} mole={mole}/>)}
    </div>
    <ScoreDisplay />
  </div>
}

export const TimeDisplay = observer(["whackAMole"], ({whackAMole}) => (
  <p>{whackAMole.isRunning
    ? 'Time left: ' + whackAMole.timeToGo
    : 'START GAME'}
  </p>
));

export const ScoreDisplay = observer(["whackAMole"], ({whackAMole}) => (
  <div className={styles.score}>
    SCORE: {whackAMole.totalActive}
  </div>
));

export default observer(["whackAMole"], WhackAMole);
