import View from '../view/view'

class Manager {
    public view: View;
    constructor() {
      this.view = new View();
    }
}

export default Manager;