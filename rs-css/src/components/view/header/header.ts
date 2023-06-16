import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import logo from "./img/logo.png";
class Header {

  public createHeaderNode(): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const header: HTMLElement = node.createNode('header', 'absolute inset-x-0 top-0 z-50'.split(' '));
    header.innerHTML = `
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-12 w-auto"
              src=${logo}
              alt=""
            />
          </a>
        </div>
        <div class="flex gap-x-12">
          <a href="https://rs.school/" target="_blink" class="text-sm font-semibold leading-6 text-gray-900"
            >RS School</a
          >
          <a href="https://github.com/Duxcoder" target="_blink" class="text-sm font-semibold leading-6 text-gray-900"
            >Duxcoder</a
          >
        </div>
      </nav>`
    return header;
  }
}

export default Header;