interface Data {
  taskTitle: string;
  code: Code;
  toys: Toys[][];
  answer: string[];
  taskSubtitle: string;
  description: string;
}[]
type Code = (string | string[])[][];
interface Toys {
  name: NamesToy;
  mode: string;
  alt: string;
  rightAnswer?: boolean;
}

type NamesToy = 'duck' | 'ring' | 'ring-o' | 'mattress' | 'ball' | 'watermelon';

type NextLvl = { rightAnswer?: boolean, selectLvl?: number }

enum Node {
  Div = 'div',
  Span = 'span',
  Ul = 'ul',
  Li = 'li'
}
export { Data, Toys, NamesToy, Code, NextLvl, Node }