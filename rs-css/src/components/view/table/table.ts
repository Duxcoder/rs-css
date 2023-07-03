import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import './style.css'
import wave from './img/wave.png';
import duckImg from './img/duck.svg';
import ringImg from './img/ring.svg';
import ringOImg from './img/ring-o.svg';
import mattressImg from './img/mattress.svg';
import ballImg from './img/ball.svg';
import watermelonImg from './img/watermelon.svg';
import { Toys, NextLvl } from "../../../types";
import Emitter from "../../emitter/emitter";

class Table {
  constructor(public emitter: Emitter) { }
  public imgs: HTMLElement[] = [];
  public createTitleTableNode(taskTitle: string): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const title: HTMLElement = node.createNode('section', 'relative isolate bg-gradient-to-b w-full from-[#a6d2ff] to-[#fff] px-6 pt-14 lg:px-8'.split(' '));
    title.innerHTML = `
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
</div>
<div class="mx-auto max-w-2xl py-12 sm:py-10 md:py-30 lg:py-10 xl:py-12">
  <div class="text-center">
    <h1 class="sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tight text-[#1b87a8]">
      ${taskTitle}
    </h1>
  </div>
</div>

</div>`
    return title;
  }

  private clearImgsStore = () => this.imgs = [];
  public createTableNode(toys: Toys[][]): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const table: HTMLElement = node.createNode('section', 'max-w-[60%] animTable bg-bottom bg-[length:400px_100px] transform-table flex rounded-[3rem] relative min-w-[200px] lg:h-[130px] pb-6 p-8 lg:pb-8 mb-10 justify-center my-0 bg-blue-500 z-1'.split(' '));
    table.style.backgroundImage = `url(${wave})`
    const nodeWrapper: NodeCreator = new NodeCreator();
    const wrapper: HTMLElement = nodeWrapper.createNode('div', 'flex-wrap lg:flex-nowrap flex justify-evenly gap-6 lg:gap-3 w-full h-fit transform-wrapper'.split(' '));
    this.clearImgsStore();
    toys.forEach(toy => {
      wrapper.append(this.createToy(toy))
    })
    table.append(wrapper);
    return table;
  }

  public createToy(toyData: Toys[]): HTMLElement {
    const nodeWrapper: NodeCreator = new NodeCreator();
    const wrapper: HTMLElement = nodeWrapper.createNode('div', 'flex justify-center relative h-[6vw] lg:h-full w-[10vw] flex-col items-center justify-end'.split(' '));

    toyData.forEach((toy, i) => {
      const node: NodeCreator = new NodeCreator();
      const mode = toy.mode !== 'normal' ? 'opacity-60' : 'opacity-100';
      const img: HTMLImageElement = <HTMLImageElement>node.createNode('img', `${mode} max-h-[130px] absolute w-full`.split(' '));
      const width = i ? 'w-[60%]' : 'w-[100%]';
      const wrapperImg = node.createNode('div', `flex ${width} h-full absolute justify-center items-center`.split(' '));
      let srcImg = '';
      switch (toy.name) {
        case 'duck': srcImg = duckImg; break;
        case 'ring': srcImg = ringImg; break;
        case 'ring-o': srcImg = ringOImg; break;
        case 'mattress': srcImg = mattressImg; break;
        case 'ball': srcImg = ballImg; break;
        case 'watermelon': srcImg = watermelonImg; break;
      }
      img.src = srcImg;
      if (toy.rightAnswer) img.classList.add('wave');
      wrapperImg.append(img);
      wrapperImg.dataset.alt = toy.alt;
      wrapper.append(wrapperImg);
      this.imgs.push(wrapperImg);
    })
    return wrapper;
  }

  mouseEvents() {
    const selectImg = (index: number | undefined | NextLvl) => {
      if (index !== undefined && typeof index === 'number') {
        const firstChild = this.imgs[index].firstElementChild;
        this.imgs[index].classList.add('hover');
        if (firstChild !== null) {
          firstChild.classList.add('drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]', 'hover');
        }
      }

    }
    const unselectImg = () => {
      this.imgs.forEach(wrapImg => {
        const firstChild = wrapImg.firstElementChild;
        wrapImg.classList.remove('hover');
        if (firstChild !== null) {
          firstChild.classList.remove('drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]');
        }
      });
    }
    this.emitter.subscribe('unselectImgOnTable', unselectImg);
    this.emitter.subscribe('selectImgOnTable', selectImg);
    this.emitter.subscribe('nextLvl', (data?: number | NextLvl) => {
      if (data !== undefined && typeof data !== 'number') {
        if (data.rightAnswer) {
          this.imgs.forEach(img => img.classList.add('bubbled'))
        }
      }
    });
    this.imgs.forEach((img, i) => {
      img.addEventListener('mouseover', () => {
        selectImg(i);
        this.emitter.emit('selectCode', i);
      });
      img.addEventListener('mouseleave', () => {
        unselectImg();
        this.emitter.emit('leaveCode');
      });
    })
  }
}

export default Table;