import { Game } from "../types/game";
import { Block, GamePack, Tour } from "../types/gamePack";
import { Player } from "../types/player";

export const gamePackKey = {
  all: ["gamePacks"] as const,
  simple: () => [...gamePackKey.all, "simple"] as const,
  simpleList: () => [...gamePackKey.simple(), "list"] as const,
  details: () => [...gamePackKey.all, "detail"] as const,
  detail: (id: GamePack["id"]) =>
    [...gamePackKey.details(), { id: id }] as const,
};

export const tourKey = {
  all: ["tours"] as const,
  list: () => [...tourKey.all, "list"] as const,
  gamePack: (gamePackId: GamePack["id"]) =>
    [...tourKey.list(), { gamePackId: gamePackId }] as const,
  details: () => [...tourKey.all, "detail"] as const,
  detail: (id: Tour["id"]) => [...tourKey.details(), { id: id }] as const,
};

export const blockKey = {
  all: ["blocks"] as const,
  list: () => [...blockKey.all, "list"] as const,
  tour: (tourId: Tour["id"]) =>
    [...blockKey.list(), { tourId: tourId }] as const,
  details: () => [...blockKey.all, "detail"] as const,
  detail: (id: Block["id"]) => [...blockKey.details(), { id: id }] as const,
};

export const gameKey = {
  all: ["games"] as const,
  list: () => [...gameKey.all, "list"] as const,
  page: (page: number, approved: boolean) => [
    ...gameKey.list(),
    { page: page, approved: approved },
  ],
  details: () => [...gameKey.all, "detail"] as const,
  detail: (id: Game["id"]) => [...gameKey.details(), { id: id }] as const,
  moderators: (id: Game["id"]) =>
    [...gameKey.detail(id), "moderators"] as const,
};

export const playerKey = {
  all: ["players"] as const,
  list: () => [...playerKey.all, "list"] as const,
  details: () => [...playerKey.all, "detail"] as const,
  detail: (id: Player["id"]) => [...playerKey.details(), { id: id }] as const,
  tourResult: (id: Player["id"], tourId: Tour["id"]) =>
    [...playerKey.detail(id), "result", tourId] as const,
  gameResult: (id: Player["id"], gameId: Game["id"]) => [
    ...playerKey.detail(id),
    "result",
    "game",
    gameId,
  ],
};
