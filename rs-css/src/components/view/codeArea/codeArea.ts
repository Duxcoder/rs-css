import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import Panel from "./panel/panel";
class CodeArea {
  public cssEditor: Panel;
  public htmlViewer: Panel;
  constructor() {
    this.cssEditor = new Panel();
    this.htmlViewer = new Panel('dark');
  }
  public createCodeAreaNode(): HTMLElement {
    const cssEditor = this.cssEditor.createPanelNode();
    const htmlViewer = this.htmlViewer.createPanelNode();
    const node: NodeCreator = new NodeCreator();
    const codeArea: HTMLElement = node.createNode('section', 'flex bg-stone-300 flex-col xl:flex-row'.split(' '));
    codeArea.append(cssEditor, htmlViewer);
    return codeArea;
  }
}

export default CodeArea;