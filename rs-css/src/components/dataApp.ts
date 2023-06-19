import { Data } from "../types"

const dataLvls: Data[] = [
  {
    taskTitle: 'Select the rings',
    code: [
      ['<ring />'],
      ['<ring />']
    ],
    toys: [
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>', rightAnswer: true }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>', rightAnswer: true }],
    ],
    answer: ['ring', '*'],
    taskSubtitle: 'Select elements by their type',
    description: 'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.'
  },
  {
    taskTitle: 'Select the pool mattresses',
    code: [
      ['<mattress />'],
      ['<ring />'],
      ['<mattress />']],
    toys: [
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>', rightAnswer: true }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>' }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>', rightAnswer: true }],
    ],
    answer: ['mattress'],
    taskSubtitle: 'Select elements by their type',
    description: 'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.'
  },
  {
    taskTitle: 'Select the orange ring',
    code: [
      ['<ring id="orange" />'],
      ['<ring />'],
      ['<mattress />']],
    toys: [
      [{ name: 'ring-o', mode: 'normal', alt: '<ring id="orange"></ring>', rightAnswer: true }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>' }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' }],
    ],
    answer: ['ring#orange', '#orange'],
    taskSubtitle: 'Select elements with an ID',
    description: 'Selects the element with a specific id. You can also combine the ID selector with the type selector.'
  },
  {
    taskTitle: 'Select the duck on the ring',
    code: [
      ['<mattress />'],
      ['<ring>', ['<duck />'], '<ring />'],
      ['<duck />']],
    toys: [
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>' },
      { name: 'duck', mode: 'normal', alt: '<duck></duck>', rightAnswer: true }],
      [{ name: 'duck', mode: 'normal', alt: '<duck></duck>' }],
    ],
    answer: ['ring>duck', 'ring duck'],
    taskSubtitle: 'Select an element inside another element',
    description: 'Selects all B inside of A. B is called a descendant because it is inside of another element.'
  },
  {
    taskTitle: 'Select the ball on the orange ring',
    code: [
      ['<mattress>', ['<watermelon />'], '<mattress />'],
      ['<ring id="orange">', ['<ball />'], '<ring />'],
      ['<ring>', ['<ball />'], '<ring />']],
    toys: [
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' },
      { name: 'watermelon', mode: 'normal', alt: '<watermelon></watermelon>' }],
      [{ name: 'ring-o', mode: 'normal', alt: '<ring id="orange"></ring>' },
      { name: 'ball', mode: 'normal', alt: '<ball></ball>', rightAnswer: true }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>' },
      { name: 'ball', mode: 'normal', alt: '<ball></ball>' }],
    ],
    answer: ['ring#orange ball', '#orange ball'],
    taskSubtitle: 'Combine the Descendant & ID Selectors',
    description: 'You can combine any selector with the descendent selector.'
  },
  {
    taskTitle: 'Select the invisible ducks',
    code: [
      ['<duck />'],
      ['<duck class="invisible" />'],
      ['<mattress>', ['<duck class="invisible" />'], '<mattress />'],
      ['<mattress />']],
    toys: [
      [{ name: 'duck', mode: 'normal', alt: '<duck></duck>' }],
      [{ name: 'duck', mode: 'invisible', alt: '<duck></duck>', rightAnswer: true }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' },
      { name: 'duck', mode: 'invisible', alt: '<duck></duck>', rightAnswer: true }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' }]
    ],
    answer: ['duck.invisible', '.invisible'],
    taskSubtitle: 'Select elements by their class',
    description: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.'
  },
  {
    taskTitle: 'Select the invisible balls',
    code: [
      ['<duck class="invisible" />'],
      ['<duck />'],
      ['<mattress>', ['<ball class="invisible" />'], '<mattress />'],
      ['<ring>', ['<ball />'], '<ring />'],
      ['<ring>', ['<ball class="invisible" />'], '<ring />'],
    ],
    toys: [
      [{ name: 'duck', mode: 'invisible', alt: '<duck></duck>' }],
      [{ name: 'duck', mode: 'normal', alt: '<duck></duck>' }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' },
      { name: 'ball', mode: 'invisible', alt: '<duck></duck>', rightAnswer: true }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>' },
      { name: 'ball', mode: 'normal', alt: '<ball></ball>' }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>' },
      { name: 'ball', mode: 'invisible', alt: '<ball></ball>', rightAnswer: true }],
    ],
    answer: ['ball.invisible', 'ring ball.invisible, mattress ball.invisible'],
    taskSubtitle: 'Combine the Class Selector',
    description: 'You can combine the class selector with other selectors, like the type selector.'
  },
  {
    taskTitle: 'Select the invisible balls in the mattresses',
    code: [
      ['<mattress>', ['<ball />'], '<mattress />'],
      ['<ball class="invisible"/>'],
      ['<mattress>', ['<ball class="invisible"/>'], '<mattress />'],
      ['<mattress>', ['<duck class="invisible"/>'], '<mattress />'],
      ['<mattress>', ['<ball class="invisible"/>'], '<mattress />'],
    ],
    toys: [
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' },
      { name: 'ball', mode: 'normal', alt: '<ball></ball>' }],
      [{ name: 'ball', mode: 'invisible', alt: '<ball></ball>' }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' },
      { name: 'ball', mode: 'invisible', alt: '<ball></ball>', rightAnswer: true }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' },
      { name: 'duck', mode: 'invisible', alt: '<duck></duck>' }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>' },
      { name: 'ball', mode: 'invisible', alt: '<ball></ball>', rightAnswer: true }],
    ],
    answer: ['mattress ball.invisible'],
    taskSubtitle: 'You can do it...',
    description: 'Combine what you learned in the last few levels to solve this one!'
  },
  {
    taskTitle: 'Select all the rings and mattresses',
    code: [
      ['<watermelon class="invisible"/>'],
      ['<watermelon />'],
      ['<ring>', ['<watermelon />'], '<ring />'],
      ['<mattress>', ['<watermelon />'], '<mattress />'],
      ['<ring>', ['<watermelon />'], '<ring />'],
      ['<watermelon />'],
      ['<watermelon class="invisible"/>'],
    ],
    toys: [
      [{ name: 'watermelon', mode: 'invisible', alt: '<watermelon></watermelon>' }],
      [{ name: 'watermelon', mode: 'normal', alt: '<watermelon></watermelon>' }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>', rightAnswer: true },
      { name: 'watermelon', mode: 'normal', alt: '<watermelon></watermelon>'}],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>', rightAnswer: true },
      { name: 'watermelon', mode: 'normal', alt: '<watermelon></watermelon>' }],
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>', rightAnswer: true },
      { name: 'watermelon', mode: 'normal', alt: '<watermelon></watermelon>' }],
      [{ name: 'watermelon', mode: 'normal', alt: '<watermelon></watermelon>' }],
      [{ name: 'watermelon', mode: 'invisible', alt: '<watermelon></watermelon>' }]
    ],
    answer: ['ring, mattress'],
    taskSubtitle: 'Combine, selectors, with... commas!',
    description: 'Thanks to Shatner technology, this selects all A and B elements. You can combine any selectors this way, and you can specify more than two.'
  },
  {
    taskTitle: 'Select all the things!',
    code: [
      ['<ring>', ['<duck />'], '<ring />'],
      ['<ring id="orange">', ['<ball />'], '<ring />'],
      ['<duck class="invisible"/>'],
      ['<mattress>', ['<ball class="invisible" />'], '<mattress />'],
      ['<mattress>', ['<watermelon />'], '<mattress />'],
    ],
    toys: [
      [{ name: 'ring', mode: 'normal', alt: '<ring></ring>', rightAnswer: true },
      { name: 'duck', mode: 'normal', alt: '<duck></duck>', rightAnswer: true }],
      [{ name: 'ring-o', mode: 'normal', alt: '<ring id="orange"></ring>', rightAnswer: true },
      { name: 'ball', mode: 'normal', alt: '<ball></ball>', rightAnswer: true }],
      [{ name: 'duck', mode: 'class="invisible"', alt: '<duck></duck>', rightAnswer: true }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>', rightAnswer: true },
      { name: 'ball', mode: 'invisible', alt: '<duck></duck>', rightAnswer: true }],
      [{ name: 'mattress', mode: 'normal', alt: '<mattress></mattress>', rightAnswer: true },
      { name: 'watermelon', mode: 'normal', alt: '<watermelon></watermelon>', rightAnswer: true }],
    ],
    answer: ['*'],
    taskSubtitle: 'You can select everything!',
    description: 'You can select all elements with the universal selector!'
  },
]

export default dataLvls;