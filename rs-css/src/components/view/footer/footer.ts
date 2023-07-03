import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import logo from './img/rs_school_js.svg'

class Footer {
  public createFooterNode(): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const footer: HTMLElement = node.createNode('footer', 'flex justify-center gap-10 items-center bg-stone-800 text-white py-2'.split(' '));
    const content = `
    <a href="https://github.com/Duxcoder" target="_blank" class="transition hover:underline underline-offset-4">
    duxcoder
    </a>
    <span>2023</span>
    <a href="https://rs.school/js/" class="hover:brightness-75 transition flex w-12 h-12" target="_blank">
    <img src=${logo} class="invert" alt="Rolling Scopes School" />
    </a>
    `
    footer.innerHTML = content;
    return footer;
  }
}

export default Footer;