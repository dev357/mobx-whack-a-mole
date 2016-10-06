import React from 'react';
import styles from './WhackAMole.css';
import {observer} from 'mobx-react';

import DevTools from 'mobx-react-devtools';
import Mole from './Mole';

function WhackAMole({whackAMole}) {
  const startGame = () => whackAMole.startGame(10, 1);
  const changeName = e => whackAMole.setName(e.target.value);

  return <div className={styles.game}>
    <DevTools />
    <h1>Whack-A-Mole</h1>
    <div className={styles.startArea}>
      <input type="text" placeholder="name" onChange={changeName}/>
      <div className={styles.startButton} onClick={startGame}>
        <TimeDisplay timeToGo={whackAMole.timeToGo} isRunning={whackAMole.isRunning}/>
      </div>
    </div>
    <div className={styles.table}>
      {whackAMole.moles.map((mole, index) => <Mole key={index} mole={mole}/>)}
    </div>
    <ScoreDisplay />
    <ScoreList />
  </div>
}

export const TimeDisplay = observer(({timeToGo, isRunning}) => (
  <p>{isRunning
    ? 'Time left: ' + timeToGo
    : 'START GAME'}
  </p>
));

export const ScoreDisplay = observer(["whackAMole"], ({whackAMole}) => (
  <div className={styles.score} onClick={whackAMole.addScore.bind(null, 'test', 789)}>
    SCORE: {whackAMole.totalActive}
  </div>
));

export const ScoreList = observer(["whackAMole"], ({whackAMole}) => {
  console.log('rendering...');
  return (
    <div>
      <ul>
        {whackAMole.sortedScores.map(score => {
          return (
            <ScoreListItem key={score.key} removeScore={whackAMole.removeScore}
              name={score.name} score={score.score} index={score.key}
            />
          )
        })}
      </ul>
    </div>
  )
});

export const ScoreListItem = observer(({removeScore, score, name, index}) => {
  return (
    <li onClick={removeScore.bind(null, index)}>
      {name} : {score}
    </li>
  )
});

export default observer(["whackAMole"], WhackAMole);
