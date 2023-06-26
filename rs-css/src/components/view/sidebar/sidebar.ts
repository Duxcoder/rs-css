import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import Emitter from "../../emitter/emitter";
class Sidebar {
  constructor(public emitter: Emitter) { }
  public createSidebarNode(lvls: number, currentLvl: number, completeLvls: number[]): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const sidebar: HTMLElement = node.createNode('aside', 'flex flex-col items-center gap-3 p-6 row-span-2 bg-blue-950 text-white'.split(' '));
    sidebar.innerHTML = `
        <h3 class="flex justify-center text-2xl">
          Levels
        </h3>
        `

    const ul: HTMLElement = node.createNode('ul', 'flex w-[10rem] justify-center flex-col'.split(' '));
    const addActive = (node: HTMLElement) => {
      node.classList.add('bg-orange-400');
      node.classList.remove('bg-slate-500');
    };
    const removeActive = (node: HTMLElement) => {
      node.classList.remove('bg-orange-400')
    };
    const addComplete = (node: HTMLElement) => {
      node.classList.add('bg-green-400')
      node.classList.remove('bg-slate-500')
    };
    const removeComplete = (node: HTMLElement) => {
      node.classList.remove('bg-green-400')
      node.classList.add('bg-slate-500')
    };
    for (let i = 0; i < lvls + 1; i += 1) {
      const li: HTMLElement = node.createNode('li', 'flex'.split(' '));
      const a: HTMLElement = node.createNode('a', 'flex justify-center px-10 w-full py-1 bg-slate-500 hover:bg-slate-300 hover:text-slate-600 transition-colors active:bg-orange-400'.split(' '), (i + 1).toString());
      if (a instanceof HTMLAnchorElement) a.href = '';
      completeLvls.includes(i) ? addComplete(a) : removeComplete(a);
      console.log(currentLvl, i);
      currentLvl === i ? addActive(a) : removeActive(a);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.emitter.emit('nextLvl', { rightAnswer: false, selectLvl: i });
      });
      li.append(a);
      ul.append(li);
    }
    sidebar.append(ul);
    return sidebar;
  }
}

export default Sidebar;