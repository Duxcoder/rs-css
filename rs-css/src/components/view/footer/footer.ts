import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import logo from './img/rs_school_js.svg'

class Footer {
  public createFooterNode(): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const footer: HTMLElement = node.createNode('footer', 'flex justify-center gap-10 items-center col-span-2 bg-stone-800 text-white p-10'.split(' '));
    const content = `
    <a href="https://github.com/Duxcoder" target="_blank">
    duxcoder
    </a>
    <span>2023</span>
    <a href="https://rs.school/js/" class="flex w-12 h-12" target="_blank">
    <img src=${logo} class="invert" alt="Rolling Scopes School" />
    </a>
    `
    footer.innerHTML = content;
    return footer;
  }
}

export default Footer;