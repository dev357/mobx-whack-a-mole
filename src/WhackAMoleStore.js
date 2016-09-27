import {observable, computed, action} from 'mobx';
import {bind} from 'decko';
import Mole from './MoleStore';

class WhackAMoleStore {
  @observable timeToGo = 0;
  secondInterval = null;
  moleInterval = null;
  gameLength = 0;
  moles = [];

  constructor(moleAmount = 9) {
    for(let i = 0; i < moleAmount; i++) this.addMole();
  }

  @computed get totalActive() {
    // return this.moles.reduce((acc, mole) => acc + mole.totalActiveTime);
    let total = 0;
    this.moles.forEach((mole) => {
      total += mole.totalActiveTime;
    });
    return total;
  }

  @computed get isRunning() {
    return this.timeToGo > 0;
  }

  @bind @action addMole() {
    this.moles.push(new Mole());
  }

  @bind @action startGame(length = 60, frequency = 3) {
    this.stopGame();

    this.moles.forEach(mole => mole.reset());

    this.gameLength = length;
    this.timeToGo = this.gameLength;

    this.secondInterval = setInterval(this.setTimeToGo, 1000);
    this.moleInterval = setInterval(this.activateRandomMole, frequency * 1000);
  }

  @bind @action setTimeToGo() {
    this.timeToGo -= 1;
    if (this.timeToGo <= 0) this.stopGame();
  }

  @bind @action stopGame() {
    clearInterval(this.moleInterval);
    clearInterval(this.secondInterval);
    this.moles.forEach(mole => mole.updateTotalActive());
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
