import { apiMapper } from "../lib/mapping";
import { API_Game, Game } from "../types/game";
import { Player } from "../types/player";
import { apiClient } from "./axios";

const getGame = async (id: Game["id"]) => {
  const response = await apiClient.get<API_Game>(`/games/${id}`);
  return apiMapper.mapGame(response.data);
};

const getPlayerByPlayArea = async (
  gameId: Game["id"],
  playArea: Player["playArea"]
) => {
  const response = await apiClient.get<Player>(
    `/games/${gameId}/players/${playArea}`
  );
  return response.data;
};

const gamesController = {
  getGame,
  getPlayerByPlayArea,
};

export default gamesController;
