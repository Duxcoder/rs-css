import { Node } from '../../../../types';
import NodeCreator from '../../../../util/nodeCreator/nodeCreator';

class Panel {
  constructor(public mode: 'light' | 'dark' = 'light') {
    this.mode = mode;
  }
  public createPanelNode(content?: HTMLElement, title?: string, descr?: string): HTMLElement {
    const TEXT_COLOR = this.mode === 'light' ? 'text-gray-500' : 'text-[#aad1b8]';
    const BG_COLOR_HEADER = this.mode === 'light' ? 'bg-blue-100' : 'bg-[#30364c]';
    const TEXT_COLOR_HEADER = this.mode === 'light' ? 'text-black' : 'text-[#c8cddd]';
    const BG_COLOR_CODE_WRAPPER = this.mode === 'light' ? 'bg-[#fff]' : 'bg-[#2d363b]';
    const BG_COLOR_LIST = this.mode === 'light' ? 'bg-[#fff]' : 'bg-[#4a585f]';
    const TEXT_COLOR_LIST = this.mode === 'light' ? 'text-[#000]' : 'text-[#ccc]';

    const { Div, Span, Ul, Li } = Node
    const node = new NodeCreator();
    const panel = node.createNode(Div, 'flex w-full flex-col'.split(' '));
    const header = node.createNode(Div, `${BG_COLOR_HEADER} flex justify-between items-center px-8 h-10 w-full`.split(' '));
    const titleHeader = node.createNode(Span, `${TEXT_COLOR_HEADER}`.split(' '), title);
    const descrHeader = node.createNode(Span, `${TEXT_COLOR}`.split(' '), descr);
    const codeWrapper = node.createNode(Div, `${BG_COLOR_CODE_WRAPPER} flex justify-center w-full min-h-[300px] py-2`.split(' '));
    const listWrapper = node.createNode(Div, `${BG_COLOR_LIST} ${TEXT_COLOR_LIST} flex justify-end w-0.5/12`.split(' '));
    const list = node.createNode(Ul, 'flex items-end px-4 flex-col'.split(' '))
    const fillNumberList = (list: HTMLElement, num = 15) => {
      for (let i = 0; i < num; i++) {
        list.append(node.createNode(Li, [], (i + 1).toString()));
      }
    }
    const contentWrapper = node.createNode(Div, `${BG_COLOR_CODE_WRAPPER} flex px-4 w-11/12 text-gray-900`.split(' '));

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