export type API_GamePack = {
  id: number;
  name: string;
  tours: Tour[];
  createdDateTime: string;
  updatedDateTime: string;
};

export type GamePack = {
  id: number;
  name: string;
  tours: Tour[];
  createdDateTime: Date;
  updatedDateTime: Date;
};

export type Tour = {
  id: number;
  name: string;
  order: number;
  takeIntoResult: boolean;
  blocks: Block[];
};

export type Block = {
  id: number;
  order: number;
  answerVariants: number[];
  questions: Question[];
};

export type Question = {
  id: number;
  text: string;
};
