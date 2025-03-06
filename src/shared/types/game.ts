import { GamePack, Tour } from "./gamePack";

export type API_Game = {
  id: number;
  name: string;
  isApproved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  status: GameStatus;
  startTimeUTC: string;
  startedTimeUTC?: string;
  endedTimeUTC?: string;
  currentTourId: Tour["id"];
  gamePackId: GamePack["id"];
};

export type Game = {
  id: number;
  name: string;
  isApproved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  status: GameStatus;
  startTimeUTC: Date;
  startedTimeUTC?: Date;
  endedTimeUTC?: Date;
  currentTourId: Tour["id"];
  gamePackId: GamePack["id"];
};

export enum GameStatus {
  WaitForStart = "WaitForStart",
  TourInProgress = "TourInProgress",
  TourResults = "TourResults",
  Results = "Results",
  Ended = "Ended",
  TourEnd = "TourEnd",
}
