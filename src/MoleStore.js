import {observable, action} from 'mobx';
import {bind} from 'decko';

class MoleStore {
  @observable totalActiveTime = 0;
  @observable active = false;
  activeStartTime = null;

  @bind @action onHit() {
    if (this.active) {
      this.updateTotalActive();
      this.active = false;
    }
  }

  @bind @action makeActive() {
    this.activeStartTime = Date.now();
    this.active = true;
  }

  @bind @action updateTotalActive() {
    if (this.activeStartTime) {
      this.totalActiveTime += Date.now() - this.activeStartTime;
      this.activeStartTime = null;
    }
  }

  @bind @action reset() {
    this.totalActiveTime = 0;
    this.active = false;
    this.activeStartTime = null;
  }
}

export default MoleStore;
