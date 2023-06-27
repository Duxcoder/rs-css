import View from '../view/view';
import dataLvls from '../dataApp';
import { Data, NextLvl } from '../../types';
import Emitter from '../emitter/emitter';
class Manager {
  public view: View;
  public data: Data[];
  public emitter: Emitter;
  private completeLvls: number[];
  private lvl: number;
  constructor() {
    this.emitter = new Emitter();
    this.view = new View(this.emitter);
    this.data = dataLvls;
    this.lvl = 0;
    this.completeLvls = [];
  }

  init() {
    const isRestart = () => localStorage.getItem('restart') === 'on';
    const setRestartOff = () => localStorage.setItem('restart', 'off');
    const setCompleteLvls = () => {
      const lvls = localStorage.getItem('lvlComplete');
      if (lvls !== null) {
        this.completeLvls = JSON.parse(lvls);
      }
    }
    const resetData = () => {
      localStorage.clear();
      this.completeLvls = [];
      this.lvl = 0;
    }
    const setLvl = (): number => {
      const num = localStorage.getItem('lvl');
      if (typeof num === 'string') {
        this.lvl = +num;
        return +num
      }
      return 0
    }

    if (isRestart()) {
      resetData();
      this.newLvl(this.lvl);
      setRestartOff();
    } else {
      setCompleteLvls();
      this.start();
      this.newLvl(setLvl());
    }

    this.emitter.subscribe('restart', () => this.init());
  }
  start() {
    const dataLvl = this.data[this.lvl];
    const maxLvl: number = this.data.length - 1;
    this.view.init(dataLvl, maxLvl, this.lvl, this.completeLvls);
    this.emitter.subscribe('nextLvl', (data?: number | NextLvl) => {
      if (data !== undefined && typeof data !== 'number') {

        if (data.selectLvl !== undefined) {
          this.lvl = data.selectLvl;
          localStorage.setItem('lvl', this.lvl.toString());
          return this.newLvl(this.lvl)
        }

        if (data.rightAnswer) {
          this.completeLvls[this.lvl] = this.lvl;
          localStorage.setItem('lvlComplete', JSON.stringify(this.completeLvls));
          this.data.length - 1 > this.lvl ? this.lvl++ : this.lvl = 0;
          localStorage.setItem('lvl', this.lvl.toString());
          return setTimeout(() => this.newLvl(this.lvl), 500);
        }

      }
    });
  }

  newLvl(lvl: number) {
    const dataLvl = this.data[lvl]
    const maxLvl: number = this.data.length - 1;
    this.view.updateLvl(dataLvl, maxLvl, this.lvl, this.completeLvls);
  }
}

export default Manager;