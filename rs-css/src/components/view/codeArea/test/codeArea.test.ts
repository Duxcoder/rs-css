import CodeArea from '../codeArea';
import Emitter from '../../../emitter/emitter';

describe('CodeArea tests', () => {
  let codeArea: CodeArea;
  let emitter: Emitter;

  beforeEach(() => {
    emitter = new Emitter();
    codeArea = new CodeArea(emitter);
  });

  test('create a CodeArea instance', () => {
    expect(codeArea).toBeInstanceOf(CodeArea);
  });

  test('create a code area node with CSS Editor and HTML Viewer panels', () => {

    codeArea.cssEditor.createPanelNode = jest.fn(() => document.createElement('div'));
    codeArea.htmlViewer.createPanelNode = jest.fn(() => document.createElement('div'));

    const code = [['<div class="sea">'], ['</div>']];
    const codeAreaNode = codeArea.createCodeAreaNode(code);

    expect(codeAreaNode.tagName).toBe('SECTION');
    expect(codeAreaNode.childElementCount).toBe(2);
    expect(codeArea.cssEditor.createPanelNode).toHaveBeenCalledTimes(1);
    expect(codeArea.htmlViewer.createPanelNode).toHaveBeenCalledTimes(1);
  });

  test('transform code into a pre element with highlighted code', () => {
    const code = [['<div class="sea">'], ['</div>']];
    const transformedCode = codeArea['transformCode'](code);

    expect(transformedCode.tagName).toBe('PRE');
    expect(transformedCode.childElementCount).toBe(4);
    expect(transformedCode.innerHTML).toContain('hljs');
  });

  test('add mouse event listeners to code nodes', () => {
    const nodesViewer: (HTMLElement | HTMLElement[])[][] = [
      [document.createElement('span')],
      [document.createElement('p'), [document.createElement('div')]],
    ];
    codeArea.nodesViewer = nodesViewer;

    emitter.emit = jest.fn();

    codeArea.mouseEvents(['answer1', 'answer2']);

    let div = nodesViewer[1][1];
    if (Array.isArray(div)) div = div[0];
    if (div instanceof HTMLElement) div.dispatchEvent(new MouseEvent('mouseover'));
    expect(emitter.emit).toHaveBeenCalledWith('selectImgOnTable', 2);

    if (div instanceof HTMLElement) div.dispatchEvent(new MouseEvent('mouseleave'));
    expect(emitter.emit).toHaveBeenCalledWith('unselectImgOnTable');
  });

  test('check run next lvl when input is right answer', () => {
    const nodesViewer: (HTMLElement | HTMLElement[])[][] = [
      [document.createElement('span')],
      [document.createElement('p'), [document.createElement('div')]],
    ];
    codeArea.nodesViewer = nodesViewer;

    const mockWrapper = document.createElement('div');
    const mockInput = document.createElement('input');
    const mockBtn = document.createElement('button');
    codeArea['wrapper'] = mockWrapper;
    codeArea['input'] = mockInput;
    codeArea['btn'] = mockBtn;

    emitter.emit = jest.fn();

    codeArea.mouseEvents(['answer1', 'answer2']);
    if (codeArea['input'] instanceof HTMLInputElement) codeArea['input'].value = 'answer1';

    mockBtn.dispatchEvent(new MouseEvent('click'));
    expect(emitter.emit).toHaveBeenCalledWith('nextLvl', { rightAnswer: true });

    if (codeArea['input'] instanceof HTMLInputElement) codeArea['input'].value = 'false';

    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    mockWrapper.dispatchEvent(enterKeyEvent);
    expect(emitter.emit).not.toHaveBeenCalledWith('nextLvl', { rightAnswer: false });
    expect(codeArea['wrapper'].getAttribute('class')).toContain('shake');
  });
});