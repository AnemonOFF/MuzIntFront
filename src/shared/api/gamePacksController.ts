import { apiMapper } from "../lib/mapping";
import { API_GamePack, GamePack } from "../types/gamePack";
import { apiClient } from "./axios";

const getGamePack = async (id: GamePack["id"]) => {
  const response = await apiClient.get<API_GamePack>(`/gamepacks/${id}/play`);
  return apiMapper.mapGamePack(response.data);
};

const gamePacksController = {
  getGamePack,
};

export default gamePacksController;
