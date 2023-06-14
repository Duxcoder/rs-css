class NodeCreator {
  public node: HTMLElement | undefined;

  public createNode(elem: string, classes: string[]): HTMLElement {
    const node: HTMLElement = document.createElement(elem);
    node.classList.add(...classes);
    this.node = node;
    return node;
  }

  get getNode() {
    return this.node;
  }
}

export default NodeCreator;