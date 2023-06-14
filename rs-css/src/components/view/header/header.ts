import NodeCreator from "../../../util/nodeCreator/nodeCreator";
class Header {

  public createHeaderNode(): HTMLElement {
    const node = new NodeCreator();
    const header = node.createNode('header', ['header']);
    header.textContent = 'This is header test';
    return header;
  }
}

export default Header;