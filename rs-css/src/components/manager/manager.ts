import View from '../view/view';
import dataLvls from '../dataApp';
import { Data, NextLvl } from '../../types';
import Emitter from '../emitter/emitter';

const RESTART = 'restart';
const LVL_COMPLETE = 'lvlComplete';
const LVL = 'lvl';
const NEXT_LVL = 'nextLvl';
const LVL_HELP = 'lvlsHelp';
const HELP_USED = 'help';

class Manager {
  public view: View;
  public data: Data[];
  public emitter: Emitter;
  private completeLvls: number[];
  private lvlsUsedHelp: number[];
  private lvl: number;
  constructor() {
    this.emitter = new Emitter();
    this.view = new View(this.emitter);
    this.data = dataLvls;
    this.lvl = 0;
    this.completeLvls = [];
    this.lvlsUsedHelp = [];
  }

  init() {
    const isRestart = () => localStorage.getItem(RESTART) === 'on';
    const setRestartOff = () => localStorage.setItem(RESTART, 'off');
    const setCompleteLvls = () => {
      const lvls = localStorage.getItem(LVL_COMPLETE);
      const lvlsHelp = localStorage.getItem(LVL_HELP);
      if (lvls !== null && lvlsHelp != null) {
        this.completeLvls = JSON.parse(lvls);
        this.lvlsUsedHelp = JSON.parse(lvlsHelp);
      }
    }
    const resetData = () => {
      localStorage.clear();
      this.completeLvls = [];
      this.lvlsUsedHelp = [];
      this.lvl = 0;
    }
    const setLvl = (): number => {
      const resLvl = localStorage.getItem(LVL);
      const num = resLvl !== null ? +resLvl : 0
      if (!Number.isNaN(num)) {
        this.lvl = num;
        return num
      }
      return 0;
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
    this.view.init(dataLvl, maxLvl, this.lvl, this.completeLvls, this.lvlsUsedHelp);
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
          if (localStorage.getItem(HELP_USED)) {
            this.lvlsUsedHelp[this.lvl] = this.lvl
            localStorage.setItem(LVL_HELP, JSON.stringify(this.lvlsUsedHelp));
            localStorage.removeItem(HELP_USED);
          }
          this.data.length - 1 > this.lvl ? this.lvl++ : this.lvl = 0;
          localStorage.setItem(LVL, this.lvl.toString());
          return setTimeout(() => this.newLvl(this.lvl), 500);
        }

      }
    });
  }

  newLvl(lvl: number) {
    this.checkWinner();
    const dataLvl = this.data[lvl]
    const maxLvl: number = this.data.length - 1;
    this.view.updateLvl(dataLvl, maxLvl, this.lvl, this.completeLvls, this.lvlsUsedHelp);
  }

  checkWinner() {
    if (this.completeLvls.includes(9)) alert('YOU WON!');
  }
}

export default Manager;