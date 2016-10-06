import {observable, computed, action} from 'mobx';
import Fb from './firebaseStore';

class ScoreBoardStore {
  @observable scores = [];

  constructor() {
    const top10Ref = Fb.scores.orderByChild('score').limitToFirst(10);
    top10Ref.on('child_added', this.fbAddScore);
    top10Ref.on('child_removed', this.fbRemoveScore);
  }

  @computed get sortedScores() {
    return this.scores.sort(function(score, score2) {
      if (score.score > score2.score) return 1;
      if (score.score < score2.score) return -1;
      return 0;
    })
  }

  @action fbAddScore = snapshot => {
    this.scores.push({...snapshot.val(), key: snapshot.key});
  };

  @action fbRemoveScore = snapshot => {
    const score = this.scores.find(score => score.key === snapshot.key);
    this.scores.remove(score);
  };

  @action removeScore = key => {
    Fb.scores.child(key).remove();
  }

}

const scoreBoardStore = new ScoreBoardStore();
export default scoreBoardStore;
