import Header from './header/header';
import Table from './table/table';
import CodeArea from './codeArea/codeArea';
import Sidebar from './sidebar/sidebar';
import Footer from './footer/footer';
import NodeCreator from '../../util/nodeCreator/nodeCreator';
import { Data } from '../../types';
import Emitter from '../emitter/emitter';
class View {
  public header: Header;
  public table: Table;
  public codeArea: CodeArea;
  public sidebar: Sidebar;
  public footer: Footer;
  private nodesPage!: { main: HTMLElement; header: HTMLElement; title: HTMLElement; table: HTMLElement; sidebar: HTMLElement; codeArea: HTMLElement; footer: HTMLElement; };

  constructor(emitter: Emitter) {
    this.header = new Header();
    this.table = new Table(emitter);
    this.codeArea = new CodeArea(emitter);
    this.sidebar = new Sidebar(emitter);
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

  public init(dataLvl: Data, lvls: number, lvl: number, completeLvls: number[], lvlsUsedHelp: number[]): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { taskTitle, code, toys, taskSubtitle, description } = dataLvl;
    const main: HTMLElement = this.mainSection();
    const header: HTMLElement = this.header.createHeaderNode();
    const title: HTMLElement = this.table.createTitleTableNode(taskTitle);
    const table: HTMLElement = this.table.createTableNode(toys);
    const runEventsTable = () => this.table.mouseEvents();
    const sidebar: HTMLElement = this.sidebar.createSidebarNode(lvls, lvl, completeLvls, lvlsUsedHelp); // taskSubtitle, description
    const codeArea: HTMLElement = this.codeArea.createCodeAreaNode(code); // code
    const runEventsCodeArea = () => this.codeArea.mouseEvents(dataLvl.answer);
    const footer: HTMLElement = this.footer.createFooterNode();

    document.body.classList.add(...'grid grid-cols-[auto_200px] grid-rows-[200px_auto_100px] h-screen'.split(' '));
    this.render(document.body, main)
    this.render(main, header);
    this.render(main, title);
    this.render(main, table);
    this.render(main, codeArea);
    this.render(document.body, sidebar);
    this.render(document.body, footer);

    runEventsTable();
    runEventsCodeArea();

    this.nodesPage = {
      main, header, title, table, sidebar, codeArea, footer
    }
  }
  private clearPage = () => {
    document.body.innerHTML = '';
  }

  public updateLvl(dataLvl: Data, lvls: number, lvl: number, completeLvls: number[], lvlsUsedHelp: number[]): void {
    this.clearPage();
    this.init(dataLvl, lvls, lvl, completeLvls, lvlsUsedHelp);
  }
}

export default View;