import { Game } from "./game";
import { Question, Tour } from "./gamePack";

export type Player = {
  id: number;
  name: string;
  playArea: string;
  playerTours: PlayerTour[];
};

export type PlayerTour = {
  id: number;
  tourId: Tour["id"];
  points: number;
  extraPoints: number;
  isAnswered: boolean;
  answers: Answer[];
};

export type Answer = {
  questionId: Question["id"];
  order: number;
};

export type AddPlayerRequest = {
  gameId: Game["id"];
  name: string;
  place: string;
};

export type TourResult = {
  playerId: Player["id"];
  tourId: Tour["id"];
  points: number;
  extraPoints: number;
  isAnswered: boolean;
  answerTimeSpan?: string;
  answers: AnswerResult[];
};

export type AnswerResult = {
  questionId: Question["id"];
  text: string;
  order: number;
  correctOrder: number;
  isCorrect: boolean;
};

export type AnswerRequest = {
  playerId: Player["id"];
  tourId: Tour["id"];
  answers: {
    questionId: Question["id"];
    order: number;
  }[];
};
