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

export { Data, Toys, NamesToy, Code }