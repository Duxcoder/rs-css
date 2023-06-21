import NodeCreator from '../../../../util/nodeCreator/nodeCreator';

class Panel {
  constructor(public mode: 'light' | 'dark' = 'light') {
    this.mode = mode;
  }
  public createPanelNode(content?: HTMLElement, title?: string, descr?: string): HTMLElement {
    const node = new NodeCreator();
    const panel = node.createNode('div', 'flex w-full flex-col'.split(' '));
    const header = node.createNode('div', 'flex justify-between items-center px-8 h-10 bg-blue-100 w-full'.split(' '));
    const titleHeader = node.createNode('span', 'text-white'.split(' '), title);
    const descrHeader = node.createNode('span', 'text-gray-500'.split(' '), descr);
    const codeWrapper = node.createNode('div', 'flex justify-center w-full min-h-[300px]'.split(' '));
    const listWrapper = node.createNode('div', 'flex justify-end w-0.5/12 bg-stone-100'.split(' '));
    const list = node.createNode('ul', 'flex items-end px-4 flex-col'.split(' '))
    const fillNumberList = (list: HTMLElement, num = 15) => {
      for (let i = 0; i < num; i++) {
        list.append(node.createNode('li', [], (i + 1).toString()));
      }
    }
    const contentWrapper = node.createNode('div', 'flex px-4 w-11/12 bg-white text-gray-900'.split(' '));

    if (content !== undefined) contentWrapper.append(content);
    fillNumberList(list, 20);
    listWrapper.append(list);
    codeWrapper.append(listWrapper, contentWrapper)
    header.append(titleHeader, descrHeader);
    panel.append(header, codeWrapper)

    return panel;
  }
}

export default Panel;