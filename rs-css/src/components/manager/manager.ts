import View from '../view/view';

class Manager {
  public view: View;
  public events: Record<string, ((data: unknown) => void)[]>;
  constructor() {
    this.view = new View();
    this.events = {};
  }

  start() {
    this.view.init();
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