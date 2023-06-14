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
}

export default View;