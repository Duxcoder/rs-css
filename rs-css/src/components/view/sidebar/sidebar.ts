import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import Emitter from "../../emitter/emitter";

const ORANGE = 'bg-orange-400';
const SLATE = 'bg-[#515151]';
const SLATE_HOVER = 'hover:bg-[#e4e4e4]';
const GREEN = 'bg-green-400';
const RESTART = 'restart';
const HELP = 'help';
const NEXT_LVL = 'nextLvl';

class Sidebar {
  constructor(public emitter: Emitter) { }
  public addRemoveClasses = (node: HTMLElement, addClass: string, removeClass: string) => {
    node.classList.add(addClass);
    node.classList.remove(removeClass);
  }
  public createSidebarNode(lvls: number, currentLvl: number, completeLvls: number[], lvlsUsedHelp: number[]): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const sidebar: HTMLElement = node.createNode('aside', 'flex flex-col items-center gap-3 p-6 row-span-3 bg-[#474747] text-white'.split(' '));
    sidebar.innerHTML = `
        <h3 class="flex justify-center text-2xl">
          Levels
        </h3>
        `
    const ul: HTMLElement = node.createNode('ul', 'flex justify-center flex-col'.split(' '));
    const addActive = (node: HTMLElement) => this.addRemoveClasses(node, ORANGE, SLATE);
    const removeActive = (node: HTMLElement) => this.addRemoveClasses(node, 'null', ORANGE);
    const addComplete = (node: HTMLElement) => this.addRemoveClasses(node, GREEN, SLATE);
    const removeComplete = (node: HTMLElement) => this.addRemoveClasses(node, SLATE, GREEN);

    for (let i = 0; i < lvls + 1; i += 1) {
      const li: HTMLElement = node.createNode('li', 'flex'.split(' '));
      const contentLink = lvlsUsedHelp.includes(i) ? (i + 1) + ' helped' : (i + 1).toString();
      const a: HTMLElement = node.createNode('a', `flex justify-center text-center px-10 sm:px-16 w-full py-1 ${SLATE} ${SLATE_HOVER} hover:text-slate-600 transition-colors active:bg-orange-400`.split(' '), contentLink);
      if (a instanceof HTMLAnchorElement) a.href = '';
      completeLvls.includes(i) ? addComplete(a) : removeComplete(a);
      currentLvl === i ? addActive(a) : removeActive(a);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.emitter.emit(NEXT_LVL, { rightAnswer: false, selectLvl: i });
      });
      li.append(a);
      ul.append(li);
    }
    sidebar.append(ul);
    const btnEnter = this.createBtnEnter();
    const btnHelp = this.createBtnHelp();
    sidebar.append(btnHelp, btnEnter);
    return sidebar;
  }

  createBtnEnter() {
    const node: NodeCreator = new NodeCreator;
    const btn = node.createNode('button', `flex ${SLATE} px-4 py-2 transition-color hover:text-slate-600 active:bg-[#fff] ${SLATE_HOVER}`.split(' '), 'PLAY AGAIN');
    btn.addEventListener('click', () => {
      localStorage.setItem(RESTART, 'on');
      this.emitter.emit(RESTART);
    }, { once: true });
    return btn;
  }

  createBtnHelp() {
    const node: NodeCreator = new NodeCreator;
    const btn = node.createNode('button', `flex ${SLATE} px-4 py-2 transition-color hover:text-slate-600 active:bg-[#fff] ${SLATE_HOVER}`.split(' '), 'HELP');
    btn.addEventListener('click', () => {
      this.emitter.emit(HELP);
    });
    return btn;
  }
}

export default Sidebar;