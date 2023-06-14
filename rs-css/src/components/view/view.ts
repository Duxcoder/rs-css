import Header from './header/header';
import Table from './table/table';
import CodeArea from './codeArea/codeArea';
import Sidebar from './sidebar/sidebar';
import Footer from './footer/footer';

class View {
  public header: Header;
  public table: Table;
  public codeArea: CodeArea;
  public sidebar: Sidebar;
  public footer: Footer;

  constructor() {
    this.header = new Header();
    this.table = new Table();
    this.codeArea = new CodeArea();
    this.sidebar = new Sidebar();
    this.footer = new Footer();
  }

  // public createNode(elem: string, classes: string[]): HTMLElement {
  //   const node = document.createElement(elem);
  //   node.classList.add(...classes);
  //   return node;
  // }

  public render(parrentNode: HTMLElement, renderNode: HTMLElement) {
    parrentNode.append(renderNode);
  }

  public init() {
    this.render(document.body, this.header.createHeaderNode());
  }
}

export default View;