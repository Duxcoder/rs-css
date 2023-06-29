import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import Panel from "./panel/panel";
import Emitter from "../../emitter/emitter";
import { Code, CallbackGiveNode } from "../../../types";
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-light.css';
import './style.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));

class CodeArea {
  public nodesViewer!: (HTMLElement | HTMLElement[])[][];
  public cssEditor: Panel;
  public htmlViewer: Panel;
  private btn: HTMLElement | undefined;
  private input: HTMLElement | undefined;
  private wrapper: HTMLElement | undefined;
  constructor(public emitter: Emitter) {
    this.cssEditor = new Panel();
    this.htmlViewer = new Panel('dark');
  }
  public createCodeAreaNode(code: Code): HTMLElement {
    const editorContent: HTMLElement = this.editorContent();
    const cssEditor = this.cssEditor.createPanelNode(editorContent, 'CSS Editor', 'style.css');
    const viewerContent: HTMLElement = this.transformCode(code);
    const htmlViewer = this.htmlViewer.createPanelNode(viewerContent, 'HTML Viewer', 'table.html');

    const node: NodeCreator = new NodeCreator();
    const codeArea: HTMLElement = node.createNode('section', 'flex bg-stone-300 flex-col xl:flex-row'.split(' '));
    codeArea.append(cssEditor, htmlViewer);
    return codeArea;
  }

  private transformCode(code: Code): HTMLElement {
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

  private editorContent() {
    const node: NodeCreator = new NodeCreator();
    const input = node.createNode('input', 'absolute w-full h-8 outline-none'.split(' '));
    const wrapper: HTMLElement = node.createNode('div', 'flex relative w-full h-full m-0'.split(' '));
    const btn: HTMLElement = node.createNode('button', 'flex justify-center items-center w-[100px] h-8 transition bg-gray-800 text-white hover:bg-gray-400'.split(' '), 'Enter')
    this.btn = btn;
    this.input = input;
    this.wrapper = wrapper;
    wrapper.append(input, btn);

    return wrapper;
  }

  mouseEvents(answer: string[]) {
    const giveNode = (nodes: (HTMLElement | HTMLElement[])[] | HTMLElement, i: number, callback: CallbackGiveNode) => {
      if (Array.isArray(nodes)) {
        index++;
        nodes.forEach(node => {
          giveNode(node, i + 1, callback);
        });
      } else {
        callback(nodes, i);
      }
    };
    let index = -1;
    this.nodesViewer.forEach((nodesRow, rowIndex) => giveNode(nodesRow, index, (node, i = 0) => {
      node.addEventListener('mouseleave', function () {
        runEmitOut();
        leaveNodes(rowIndex);
      });
      node.addEventListener('mouseover', function () {
        runEmitIn(i);
        hoverNodes(node, rowIndex);
      });
    }))
    const runEmitIn = (i: number) => {
      this.emitter.emit('selectImgOnTable', i);
    }
    const runEmitOut = () => {
      this.emitter.emit('unselectImgOnTable');
    }
    const hoverNodes = (node: HTMLElement | HTMLElement[], rowIndex: number) => {
      if (this.nodesViewer[rowIndex].includes(node)) {
        this.nodesViewer[rowIndex].forEach(node => {
          if (node instanceof HTMLElement) {
            node.classList.add('select')
          } else {
            node[0].classList.add('select')
          }
        })
      } else {
        if (node instanceof HTMLElement) {
          node.classList.add('select');
        }
      }
    }
    const leaveNodes = (rowIndex: number) => {
      this.nodesViewer[rowIndex].forEach((nodes, i) => giveNode(nodes, i, (node) => {
        node.classList.remove('select')
      }))
    }

    const runEmitRightAnswer = () => this.emitter.emit('nextLvl', { rightAnswer: true });

    const { input, btn, wrapper } = this;
    if (btn !== undefined &&
      input !== undefined &&
      wrapper !== undefined) {

      const enterBtn = function () {
        if (input instanceof HTMLInputElement) {
          const rightAnswer = answer.includes(input.value.trim());

          if (!rightAnswer) {
            wrapper.classList.add('shake');
            setTimeout(() => { wrapper.classList.remove('shake') }, 400);
          }

          if (rightAnswer) runEmitRightAnswer();
        }
      }

      btn.addEventListener('click', enterBtn);
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') enterBtn()
      });
    }

    const cssHighlight = new NodeCreator().createNode('div', 'text-[#e45649] py-1 pointer-events-none h-8 absolute z-10'.split(' '));
    this.wrapper?.prepend(cssHighlight);

    input?.addEventListener('input', function () {
      if (this instanceof HTMLInputElement) {
        const inputText = this.value;
        const highlightSelector = hljs.highlight(inputText, { language: 'css' }).value;
        cssHighlight.innerHTML = highlightSelector
      }
    })
  }
}

export default CodeArea;