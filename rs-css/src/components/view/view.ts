import Header from './header/header';
import Table from './table/table';
import CodeArea from './codeArea/codeArea';
import Sidebar from './sidebar/sidebar';
import Footer from './footer/footer';
import NodeCreator from '../../util/nodeCreator/nodeCreator';
import { Data } from '../../types';
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

  public mainSection(): HTMLElement {
    const node = new NodeCreator();
    const main = node.createNode('main', 'relative row-span-2'.split(' '));
    return main
  }

  public render(parentNode: HTMLElement, renderNode: HTMLElement): void {
    parentNode.append(renderNode);
  }

  public init(dataLvl: Data): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { taskTitle, code, toys, taskSubtitle, description } = dataLvl;
    const main: HTMLElement = this.mainSection();
    const header: HTMLElement = this.header.createHeaderNode();
    const title: HTMLElement = this.table.createTitleTableNode(taskTitle);
    const table: HTMLElement = this.table.createTableNode(toys);
    const sidebar: HTMLElement = this.sidebar.createSidebarNode(); // taskSubtitle, description
    const codeArea: HTMLElement = this.codeArea.createCodeAreaNode(code); // code
    const footer: HTMLElement = this.footer.createFooterNode();

    document.body.classList.add(...'grid grid-cols-[4/6_2/6] grid-rows-[200px_auto_100px] h-screen'.split(' '));
    this.render(document.body, main)
    this.render(main, header);
    this.render(main, title);
    this.render(main, table);
    this.render(main, codeArea);
    this.render(document.body, sidebar);
    this.render(document.body, footer);
  }
}

export default View;