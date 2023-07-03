import Table from "../table";
import Emitter from "../../../emitter/emitter";
import { Toys } from "../../../../types";

const emitterMock: Emitter = {
  emit: jest.fn(),
  events: {},
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};
const table = new Table(emitterMock);

test('Is the inner toy small?', () => {
  const toyData: Toys[]  =
    [{ name: 'ring', mode: 'normal', alt: '<ring></ring>', rightAnswer: true },
    { name: 'mattress', mode: 'normal', alt: '<ring></ring>', rightAnswer: false }];

  const wrapperToy = table.createToy(toyData);
  expect(wrapperToy.tagName).toBe('DIV');
  const toys = wrapperToy.querySelectorAll('div');
  expect(toys.length).toBe(2);
  const innerToy = toys[1];
  expect(innerToy.getAttribute('class')).toContain('w-[50%]');
});
