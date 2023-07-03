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
          <a href="#" class="flex flex-row-reverse font-medium">
            <img
              class="h-10 w-auto sm:h-16"
              src=${logo}
              alt=""
            />
          </a>
        </div>
        <div class="flex gap-x-12">
          <a href="https://rs.school/" target="_blink" class="text-sm font-semibold leading-6 text-[#104a5e] hover:text-black transition"
            >RS School</a
          >
          <a href="https://github.com/Duxcoder" target="_blink" class="text-sm font-semibold leading-6 text-[#104a5e] hover:text-black transition"
            >Duxcoder</a
          >
        </div>
      </nav>`
    return header;
  }
}

export default Header;