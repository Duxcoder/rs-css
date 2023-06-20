import NodeCreator from "../../../util/nodeCreator/nodeCreator";
import './style.css'
import wave from './img/wave.png';
import duckImg from './img/duck.svg';
import ringImg from './img/ring.svg';
import ringOImg from './img/ring-o.svg';
import mattressImg from './img/mattress.svg';
import ballImg from './img/ball.svg';
import watermelonImg from './img/watermelon.svg';
import { Toys } from "../../../types";

class Table {

  public createTitleTableNode(taskTitle: string): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const title: HTMLElement = node.createNode('section', 'relative isolate px-6 pt-14 lg:px-8'.split(' '));
    title.innerHTML = `
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
      <div class="mx-auto max-w-2xl py-10 sm:py-16 lg:py-20">
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
           ${taskTitle}
          </h1>
        </div>
      </div>
      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>`
    return title;
  }

  public createTableNode(toys: Toys[][]): HTMLElement {
    const node: NodeCreator = new NodeCreator();
    const table: HTMLElement = node.createNode('section', 'bg-bottom bg-[length:400px_100px] transform-table flex rounded-[3rem] relative min-w-[200px] h-[160px] w-fit p-8 mb-10 justify-center my-0 mx-auto bg-blue-500 z-1'.split(' '));
    table.style.backgroundImage = `url(${wave})`
    const nodeWrapper: NodeCreator = new NodeCreator();
    const wrapper: HTMLElement = nodeWrapper.createNode('div', 'flex transform-wrapper'.split(' '));
    toys.forEach(toy => {
      wrapper.append(this.createToy(toy))
    })
    table.append(wrapper);
    return table;
  }

  public createToy(toyData: Toys[]): HTMLElement {
    const nodeWrapper: NodeCreator = new NodeCreator();
    const wrapper: HTMLElement = nodeWrapper.createNode('div', 'flex justify-center relative h-full w-[10vw] flex-col items-center justify-end'.split(' '));

    toyData.forEach((toy, i) => {
      const nodeImg: NodeCreator = new NodeCreator();
      const mode = toy.mode !== 'normal' ? 'opacity-60' : 'opacity-100';
      const img: HTMLImageElement = <HTMLImageElement>nodeImg.createNode('img', `${mode} max-h-[130px] px-4 absolute w-[${10 - i * 2}0%]`.split(' '));
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
      wrapper.append(img);
    })
    return wrapper;
  }
}

export default Table;