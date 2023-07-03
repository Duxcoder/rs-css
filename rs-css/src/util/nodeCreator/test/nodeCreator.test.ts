import NodeCreator from "../nodeCreator";

test('create an HTML element with specified tag, classes, and text content', () => {
  const nodeCreator = new NodeCreator();
  const elem = 'div';
  const classes = ['class1', 'class2'];
  const textContent = 'NodeCreator test complete';

  const createdNode = nodeCreator.createNode(elem, classes, textContent);

  expect(createdNode.tagName.toLowerCase()).toBe(elem);
  expect(Array.from(createdNode.classList)).toEqual(classes);
  expect(createdNode.textContent).toBe(textContent);
});