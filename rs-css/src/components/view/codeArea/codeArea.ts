import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import Panel from "./panel/panel";
import { Code } from "../../../types";
import hljs from 'highlight.js/lib/core'
// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
class CodeArea {
  public cssEditor: Panel;
  public htmlViewer: Panel;
  constructor() {
    this.cssEditor = new Panel();
    this.htmlViewer = new Panel('dark');
  }
  public createCodeAreaNode(code: Code): HTMLElement {
    const cssEditor = this.cssEditor.createPanelNode();
    const codeContent:HTMLElement = this.transformCode(code);
    const htmlViewer = this.htmlViewer.createPanelNode(codeContent);

    const node: NodeCreator = new NodeCreator();
    const codeArea: HTMLElement = node.createNode('section', 'flex bg-stone-300 flex-col xl:flex-row'.split(' '));
    codeArea.append(cssEditor, htmlViewer);
    return codeArea;
  }

  public transformCode(code: Code): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const pre: HTMLElement = node.createNode('pre', 'flex flex-col'.split(' '));
    code.forEach(selectorRow => {
      const appendCodeRow = (arrSelector: (string | string[])[], countTab = 1) => {
        arrSelector.forEach(selector => {
          const span: HTMLElement = node.createNode('span', 'flex'.split(' '));
          if (typeof selector === 'string') {
            const tab = '\u00A0'.repeat(countTab)
            const highlightSelector = hljs.highlight(tab + selector, {language: 'xml'}).value;
            span.innerHTML = highlightSelector;
          } else {
            return appendCodeRow(selector, countTab + 1);
          }
          pre.append(span);
         })
      }
      appendCodeRow(selectorRow);
    })
    pre.prepend('<div class="sea">');
    pre.append('</div>');
    return pre;
  }
}

export default CodeArea;