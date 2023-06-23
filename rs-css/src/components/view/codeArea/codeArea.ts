import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import Panel from "./panel/panel";
import { Code } from "../../../types";
import hljs from 'highlight.js/lib/core'
import Emitter from "../../emitter/emitter";
import './style.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
type CallbackGiveNode = (node: HTMLElement, i?: number) => void
class CodeArea {
  public nodesViewer!: (HTMLElement | HTMLElement[])[][];
  public cssEditor: Panel;
  public htmlViewer: Panel;
  constructor(public emitter: Emitter) {
    this.cssEditor = new Panel();
    this.htmlViewer = new Panel('dark');
  }
  public createCodeAreaNode(code: Code): HTMLElement {
    const cssEditor = this.cssEditor.createPanelNode();
    const codeContent: HTMLElement = this.transformCode(code);
    const htmlViewer = this.htmlViewer.createPanelNode(codeContent, 'HTML Viewer', 'table.html');

    const node: NodeCreator = new NodeCreator();
    const codeArea: HTMLElement = node.createNode('section', 'flex bg-stone-300 flex-col xl:flex-row'.split(' '));
    codeArea.append(cssEditor, htmlViewer);
    this.mouseEvents()
    return codeArea;
  }

  public transformCode(code: Code): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const pre: HTMLElement = node.createNode('pre', 'flex flex-col'.split(' '));
    const appendCodeRow = (arrSelector: (string | string[])[], countTab = 1): (HTMLElement | HTMLElement[])[] => {
      const maps: (HTMLElement | HTMLElement[])[] = arrSelector.map(selector => {
        const span: HTMLElement = node.createNode('span', 'flex cursor-default'.split(' ')) as HTMLElement;
        if (typeof selector === 'string') {
          const tab = '\u00A0'.repeat(countTab);
          const highlightSelector = hljs.highlight(tab + selector, { language: 'xml' }).value;
          span.innerHTML = highlightSelector;
        } else {
          return appendCodeRow(selector, countTab + 1) as HTMLElement | HTMLElement[];
        }
        pre.append(span);
        return span;
      })
      return maps;
    }
    this.nodesViewer = code.map(selectorRow => appendCodeRow(selectorRow));
    pre.insertAdjacentHTML('afterbegin', hljs.highlight('<div class="sea">', { language: 'xml' }).value);
    pre.insertAdjacentHTML('beforeend', hljs.highlight('</div>', { language: 'xml' }).value);
    return pre;
  }

  mouseEvents() {
    const giveNode = (nodes: (HTMLElement | HTMLElement[])[] | HTMLElement, i:number, callback: CallbackGiveNode) => {
      if (Array.isArray(nodes)) {
        index++;
        nodes.forEach(node => {
          giveNode(node, i + 1, callback);
        });
      } else {
        console.log(nodes, i);
        callback(nodes, i);
      }
    };
    let index = -1;
    this.nodesViewer.forEach((nodesRow) => giveNode(nodesRow, index, (node, i = 0) => {
      node.addEventListener('mouseleave', function () { runEmitOut() });
      node.addEventListener('mouseover', function () { runEmitIn(i) });
    }))
    const runEmitIn = (i: number) => {
      this.emitter.emit('selectImgOnTable', i);
    }
    const runEmitOut = () => {
      this.emitter.emit('unselectImgOnTable');
    }
  }
}

export default CodeArea;