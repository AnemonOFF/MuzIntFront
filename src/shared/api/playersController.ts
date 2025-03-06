import { Game } from "../types/game";
import { Tour } from "../types/gamePack";
import { Collection } from "../types/generic";
import {
  AddPlayerRequest,
  AnswerRequest,
  Player,
  TourResult,
} from "../types/player";
import { apiClient } from "./axios";

const addPlayer = async (data: AddPlayerRequest) => {
  const response = await apiClient.post<Player>("/players", data);
  return response.data;
};

const getTourAnswers = async (playerId: Player["id"], tourId: Tour["id"]) => {
  const response = await apiClient.get<TourResult>(
    `/players/${playerId}/tour/${tourId}`
  );
  return response.data;
};

const getGameResults = async (playerId: Player["id"], gameId: Game["id"]) => {
  const response = await apiClient.get<Collection<TourResult>>(
    `/players/${playerId}/game/${gameId}`
  );
  return response.data.items;
};

const answerTour = async (data: AnswerRequest) => {
  const response = await apiClient.post<TourResult>(`/players/answer`, data);
  return response.data;
};

const playersController = {
  addPlayer,
  getTourAnswers,
  answerTour,
  getGameResults,
};

export default playersController;
