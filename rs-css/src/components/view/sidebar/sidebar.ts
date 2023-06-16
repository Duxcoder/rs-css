import NodeCreator from "../../../util/nodeCreator/nodeCreator";

class Sidebar {
  public createSidebarNode(): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const sidebar: HTMLElement = node.createNode('aside', 'flex flex-col items-center gap-3 p-6 row-span-2 bg-blue-950 text-white'.split(' '));
    sidebar.innerHTML = `
        <h3 class="flex justify-center text-2xl">
          Levels
        </h3>
        <ul class="flex flex-col gap-2">
          <li><a class="flex px-10 py-1 bg-slate-500 hover:bg-slate-300 hover:text-slate-600 transition-colors" href="">Level 1</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 2</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 3</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 4</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 5</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 6</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 7</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 8</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 9</a></li>
          <li><a class="flex px-10 py-1 bg-slate-500" href="">Level 10</a></li>
        </ul>`
    return sidebar;
  }
}

export default Sidebar;