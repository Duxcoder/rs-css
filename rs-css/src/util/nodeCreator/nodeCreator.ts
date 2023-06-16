class NodeCreator {
  public node: HTMLElement | undefined;

  public createNode(elem: string, classes: string[], textContent: string | null = null): HTMLElement {
    const node: HTMLElement = document.createElement(elem);
    node.classList.add(...classes);
    if (textContent) node.textContent = textContent
    this.node = node;
    return node;
  }

  get getNode() {
    return this.node;
  }
}

export default NodeCreator;