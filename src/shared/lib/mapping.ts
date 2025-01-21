import { API_Game, Game } from "../types/game";
import { API_GamePack, GamePack } from "../types/gamePack";

const mapGamePack = (apiResult: API_GamePack): GamePack => ({
  ...apiResult,
  createdDateTime: new Date(apiResult.createdDateTime),
  updatedDateTime: new Date(apiResult.updatedDateTime),
});

const mapGame = (apiResult: API_Game): Game => ({
  ...apiResult,
  endedTimeUTC: apiResult.endedTimeUTC
    ? new Date(apiResult.endedTimeUTC)
    : undefined,
  startedTimeUTC: apiResult.startedTimeUTC
    ? new Date(apiResult.startedTimeUTC)
    : undefined,
  startTimeUTC: new Date(apiResult.startTimeUTC),
});

export const apiMapper = {
  mapGamePack,
  mapGame,
};
