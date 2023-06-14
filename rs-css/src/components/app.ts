import Manager from "./manager/manager";

class App {
  public manager: Manager;
  constructor() {
    this.manager = new Manager;
  }
  start() {
    this.manager.start();
  }
}

export default App;