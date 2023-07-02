import Emitter from "../../../emitter/emitter";
import Sidebar from "../sidebar";

test('click on btn run restart emit', () => {
  const RESTART = 'restart';
  const emitterMock: Emitter = {
    emit: jest.fn(),
    events: {},
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  };
  const sidebar = new Sidebar(emitterMock);
  const btn = sidebar.createBtnEnter();
  const emitSpy = jest.spyOn(emitterMock, 'emit');
  btn.dispatchEvent(new Event('click'));
  expect(emitSpy).toHaveBeenCalledWith(RESTART);
});
