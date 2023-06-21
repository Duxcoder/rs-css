
class Emitter {
  public events: Record<string, ((data?: number) => void)[]>;
  constructor() {
    this.events = {};
  }

  emit(eventName: string, data?: number) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        data !== undefined ? fn(data) : fn();
      });
    }
  }

  subscribe(eventName: string, callback: (arg?: number) => void) {
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