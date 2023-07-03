
import Manager from "../manager";

const manager = new Manager();
test('not display an alert if level 9 is not completed', () => {
  const mockCompleteLvls = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  window.alert = jest.fn();
  manager['completeLvls'] = mockCompleteLvls;

  manager.checkWinner();

  expect(window.alert).not.toHaveBeenCalled();
});