import { NextLvl } from '../../types'

class Emitter {
  public events: Record<string, ((data?: number | NextLvl) => void)[]>;
  constructor() {
    this.events = {};
  }

  emit(eventName: string, data?: number | NextLvl) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        if (data !== undefined) {
          fn(data);
        } else {
          fn();
        }
      });
    }
  }

  subscribe(eventName: string, callback: (arg?: number | NextLvl) => void) {
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

export default Emitter;