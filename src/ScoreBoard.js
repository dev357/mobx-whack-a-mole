import React from 'react';
import {observer} from 'mobx-react';
import styles from './ScoreBoard.css';
import {Link} from 'react-router';

function ScoreBoard({scoreBoard}) {
  return (
    <div className={styles.scoreboard}>
      <div>
        <h1>Scoreboard(top10)</h1>
        <ol>
          {scoreBoard.sortedScores.map(score => (
            <ScoreListItem
              key={score.key}
              removeScore={scoreBoard.removeScore}
              name={score.name}
              score={score.score}
              index={score.key}
            />
          ))}
        </ol>
        <hr />
        <Link to="/">back to game</Link>
      </div>
    </div>
  )
}

export const ScoreListItem = observer(({removeScore, score, name, index}) => {
  return (
    <li className={styles.score}>
      {score} - {name}
      <span onClick={removeScore.bind(null, index)}>x</span>
    </li>
  )
});

export default observer(["scoreBoard"], ScoreBoard);