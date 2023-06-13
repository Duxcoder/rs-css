import Manager from "./manager/manager";

class App {
  public manager: Manager;
  constructor() {
    this.manager = new Manager;
  }
  start() {
    throw new Error('Method not implemented.');
  }
}

export default App;