import {observable, computed, action} from 'mobx';
import {bind} from 'decko';
import Fb from './firebaseStore';
import Mole from './MoleStore';

class WhackAMoleStore {
  @observable timeToGo = 0;
  @observable scores = [];
  @observable name = null;
  secondInterval = null;
  moleInterval = null;
  gameLength = 0;
  moles = [];
  running = false;

  constructor(moleAmount = 9) {
    for(let i = 0; i < moleAmount; i++) this.addMole();
    const top10Ref = Fb.scores.orderByChild('score').limitToFirst(10);
    top10Ref.on('child_added', this.fbAddScore);
    top10Ref.on('child_removed', this.fbRemoveScore);
    //top10Ref.on('child_moved', this.fbMoveScore);
  }

  @computed get totalActive() {
    // return this.moles.reduce((acc, mole) => acc + mole.totalActiveTime);
    let total = 0;
    this.moles.forEach((mole) => {
      total += mole.totalActiveTime;
    });
    return total;
  }

  @computed get sortedScores() {
    return this.scores.sort(function(score, score2) {
      if (score.score > score2.score) return 1;
      if (score.score < score2.score) return -1;
      return 0;
    })
  }

  @computed get isRunning() {
    return this.timeToGo > 0;
  }

  @bind @action setName(name) {
    this.name = name;
  }

  @action fbAddScore = (snapshot) => {
    this.scores.push({...snapshot.val(), key: snapshot.key});
  };

  @action fbRemoveScore = snapshot => {
    const score = this.scores.find(score => score.key === snapshot.key);
    this.scores.remove(score);
  };

  @bind @action addMole() {
    this.moles.push(new Mole());
  }

  @bind @action addScore(name, score) {
    const id = Fb.scores.push().key;
    console.log({id});
    Fb.scores.update({[id]: {name, score}});
  }

  @bind @action removeScore(key) {
    Fb.scores.child(key).remove();
  }

  @bind @action startGame(length = 60, frequency = 3) {
    if (!this.name) return;
    this.running = true;
    this.stopGame();

    this.moles.forEach(mole => mole.reset());

    this.gameLength = length;
    this.timeToGo = this.gameLength;

    this.secondInterval = setInterval(this.setTimeToGo, 1000);
    this.moleInterval = setInterval(this.activateRandomMole, frequency * 1000);
  }

  @bind @action setTimeToGo() {
    this.timeToGo -= 1;
    if (this.timeToGo <= 0) {
      this.running = false;
      this.stopGame();
    }
  }

  @bind @action stopGame() {
    clearInterval(this.moleInterval);
    clearInterval(this.secondInterval);
    this.moles.forEach(mole => mole.updateTotalActive());
    if (!this.running) {
      this.addScore(this.name, this.totalActive);
    }
  }

  @bind @action activateRandomMole() {
    let inactiveMoles = this.moles.filter(mole => !mole.active);
    if (inactiveMoles.length > 0) {
      const randomIndex = Math.floor(Math.random() * inactiveMoles.length);
      inactiveMoles[randomIndex].makeActive();
    }
  }
}

const whackAMoleStore = new WhackAMoleStore();
export default whackAMoleStore;
