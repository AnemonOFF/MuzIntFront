import { apiMapper } from "../lib/mapping";
import { API_Game, Game } from "../types/game";
import { apiClient } from "./axios";

const getGame = async (id: Game["id"]) => {
  const response = await apiClient.get<API_Game>(`/games/${id}`);
  return apiMapper.mapGame(response.data);
};

const gamesController = {
  getGame,
};

export default gamesController;
