import View from '../view/view';
import dataLvls from '../dataApp';
import { Data } from '../../types';
class Manager {
  public view: View;
  public events: Record<string, ((data: unknown) => void)[]>;
  public data: Data[];
  constructor() {
    this.view = new View();
    this.events = {};
    this.data = dataLvls;
  }

  start() {
    this.view.init(this.data[9]);
  }

  emit(eventName: string, data: unknown) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        fn.call(null, data);
      });
    }
  }

  subscribe(eventName: string, callback: () => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => callback !== eventFn);
    }
  }

  unsubscribe(eventName: string, callback: () => void) {
    this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
  }
}

export default Manager;