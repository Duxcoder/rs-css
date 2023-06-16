import NodeCreator from "../../../util/nodeCreator/nodeCreator";

class Footer {

  public createFooterNode(): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const footer: HTMLElement = node.createNode('footer', 'flex justify-center items-center col-span-2 bg-stone-800 text-white p-10'.split(' '), 'footer');
    return footer;
  }
}

export default Footer;