import {observable, computed, action} from 'mobx';
import Fb from './firebaseStore';
import Mole from './MoleStore';

class WhackAMoleStore {
  @observable timeToGo = 0;
  @observable name = null;
  secondInterval = null;
  moleInterval = null;
  gameLength = 0;
  moles = [];
  running = false;

  constructor(moleAmount = 9) {
    for(let i = 0; i < moleAmount; i++) this.addMole();
  }

  @computed get totalActive() {
    return this.moles.reduce((acc, mole) => acc + mole.totalActiveTime, 0);
  }

  @computed get isRunning() {
    return this.timeToGo > 0;
  }

  @action setName = name => {
    this.name = name;
  };

  @action addMole = () => {
    this.moles.push(new Mole());
  };

  @action addScore = (name, score) => {
    Fb.scores.push({name, score});
  };

  @action startGame = (length = 60, frequency = 3) => {
    if (!this.name) return;
    this.running = true;
    this.stopGame();

    this.moles.forEach(mole => mole.reset());

    this.gameLength = length;
    this.timeToGo = this.gameLength;

    this.secondInterval = setInterval(this.setTimeToGo, 1000);
    this.moleInterval = setInterval(this.activateRandomMole, frequency * 1000);
  };

  @action setTimeToGo = () => {
    this.timeToGo -= 1;
    if (this.timeToGo <= 0) {
      this.running = false;
      this.stopGame();
    }
  };

  @action stopGame = () => {
    clearInterval(this.moleInterval);
    clearInterval(this.secondInterval);
    this.moles.forEach(mole => mole.updateTotalActive());
    if (!this.running) {
      this.addScore(this.name, this.totalActive);
    }
  };

  @action activateRandomMole = () => {
    let inactiveMoles = this.moles.filter(mole => !mole.active);
    if (inactiveMoles.length > 0) {
      const randomIndex = Math.floor(Math.random() * inactiveMoles.length);
      inactiveMoles[randomIndex].makeActive();
    }
  }
}

const whackAMoleStore = new WhackAMoleStore();
export default whackAMoleStore;
