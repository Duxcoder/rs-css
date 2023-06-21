import View from '../view/view';
import dataLvls from '../dataApp';
import { Data } from '../../types';
import Emitter from '../emitter/emitter';
class Manager {
  public view: View;
  public data: Data[];
  public emitter: Emitter;
  constructor() {
    this.emitter = new Emitter();
    this.view = new View(this.emitter);
    this.data = dataLvls;
  }

  start() {
    this.view.init(this.data[9]);
  }
}

export default Manager;