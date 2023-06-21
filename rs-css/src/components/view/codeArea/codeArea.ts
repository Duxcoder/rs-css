import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import Panel from "./panel/panel";
import { Code } from "../../../types";
import hljs from 'highlight.js/lib/core'
import Emitter from "../../emitter/emitter";
// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
class CodeArea {
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
    return codeArea;
  }

  public transformCode(code: Code): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const pre: HTMLElement = node.createNode('pre', 'flex flex-col'.split(' '));
    let index = -1;
    const appendCodeRow = (arrSelector: (string | string[])[], i: number, countTab = 1) => {
      arrSelector.forEach(selector => {
        const span: HTMLElement = node.createNode('span', 'flex cursor-default'.split(' '));
        if (typeof selector === 'string') {
          const tab = '\u00A0'.repeat(countTab);
          const highlightSelector = hljs.highlight(tab + selector, { language: 'xml' }).value;
          span.innerHTML = highlightSelector;

          const runEmitIn = (i: number) => this.emitter.emit('selectImgOnTable', i);
          const runEmitOut = () => this.emitter.emit('unselectImgOnTable');
          span.addEventListener('mouseleave', function () { runEmitOut() });
          span.addEventListener('mouseover', function () { runEmitIn(i) });

        } else {
          index++
          appendCodeRow(selector, i + 1, countTab + 1);
          return
        }
        pre.append(span);
      })
    }
    code.forEach(selectorRow => appendCodeRow(selectorRow, ++index));

    pre.insertAdjacentHTML('afterbegin', hljs.highlight('<div class="sea">', { language: 'xml' }).value);
    pre.insertAdjacentHTML('beforeend', hljs.highlight('</div>', { language: 'xml' }).value);
    return pre;
  }
}

export default CodeArea;