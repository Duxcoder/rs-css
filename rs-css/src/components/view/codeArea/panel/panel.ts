import NodeCreator from '../../../../util/nodeCreator/nodeCreator';

class Panel {
  constructor (public mode: 'light' | 'dark' = 'light') {
    this.mode = mode;
  }
  public createPanelNode(content?: HTMLElement): HTMLElement {
    const node = new NodeCreator();
    const panel = node.createNode('div', 'flex w-full flex-col'.split(' '));
    const contentInner = content?.outerHTML;
    panel.innerHTML = `
    <div class="flex justify-between items-center px-8 h-10 bg-blue-100 w-full">
      <span class ="text-white">CSS Editor</span>
      <span class ="text-gray-500">style.css</span>
    </div>
    <div class ="flex justify-center w-full min-h-[300px]">
      <div class="flex justify-end w-0.5/12 bg-stone-100">
        <ul class="flex items-end px-4 flex-col">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
        </ul>
      </div>
      <div class="flex px-4 w-11/12 bg-white text-gray-900">
       <pre>${contentInner}
        </pre>
      </div>
    </div>`
    return panel;
  }
}

export default Panel;