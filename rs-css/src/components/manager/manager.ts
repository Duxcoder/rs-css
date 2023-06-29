import View from '../view/view';
import dataLvls from '../dataApp';
import { Data, NextLvl } from '../../types';
import Emitter from '../emitter/emitter';

const RESTART = 'restart';
const LVL_COMPLETE = 'lvlComplete';
const LVL = 'lvl';
const NEXT_LVL = 'nextLvl';

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
    const isRestart = () => localStorage.getItem(RESTART) === 'on';
    const setRestartOff = () => localStorage.setItem(RESTART, 'off');
    const setCompleteLvls = () => {
      const lvls = localStorage.getItem(LVL_COMPLETE);
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
      const resLvl = localStorage.getItem(LVL);
      const num = resLvl !== null ? +resLvl : 0
      if (!Number.isNaN(num)) {
        this.lvl = num;
        return num
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

    this.emitter.subscribe(RESTART, () => this.init());
  }

  start() {
    const dataLvl = this.data[this.lvl];
    const maxLvl: number = this.data.length - 1;
    this.view.init(dataLvl, maxLvl, this.lvl, this.completeLvls);
    this.emitter.subscribe(NEXT_LVL, (data?: number | NextLvl) => {
      if (data !== undefined && typeof data !== 'number') {

        if (data.selectLvl !== undefined) {
          this.lvl = data.selectLvl;
          localStorage.setItem(LVL, this.lvl.toString());
          return this.newLvl(this.lvl)
        }

        if (data.rightAnswer) {
          this.completeLvls[this.lvl] = this.lvl;
          localStorage.setItem(LVL_COMPLETE, JSON.stringify(this.completeLvls));
          this.data.length - 1 > this.lvl ? this.lvl++ : this.lvl = 0;
          localStorage.setItem(LVL, this.lvl.toString());
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