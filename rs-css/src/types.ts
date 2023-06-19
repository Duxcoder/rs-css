interface Data {
  taskTitle: string;
  code: (string | string[])[][];
  toys: Toys[][];
  answer: string[];
  taskSubtitle: string;
  description: string;
}[]

interface Toys {
  name: NamesToy;
  mode: string;
  alt: string;
  rightAnswer?: boolean;
}

type NamesToy = 'duck' | 'ring' | 'ring-o' | 'mattress' | 'ball' | 'watermelon';

export { Data, Toys, NamesToy }