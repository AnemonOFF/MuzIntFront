import { Game, GameStatus } from "@/shared/types/game";
import { Tour } from "@/shared/types/gamePack";
import { Player } from "@/shared/types/player";
import { HubConnection } from "@microsoft/signalr";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type GameState = {
  status: GameStatus;
  currentTourId?: Tour["id"];
};

type PlayerGameState = {
  id: Game["id"];
  gameState?: GameState;
  playerId: Player["id"];
  name: string;
  place: string;
};

type PlayerState = {
  games: { [id: Game["id"]]: PlayerGameState };
  connection?: HubConnection;
};

type Actions = {
  addGame: (
    gameId: Game["id"],
    playerId: Player["id"],
    name: string,
    place: string
  ) => void;
  setGameState: (
    gameId: Game["id"],
    status: GameStatus,
    tourId?: Tour["id"]
  ) => void;
  setConnection: (connection?: HubConnection) => void;
};

type PlayerStoreType = PlayerState & Actions;

export const usePlayerStore = create<PlayerStoreType>()(
  devtools(
    persist(
      (set) => ({
        games: {} as PlayerState["games"],
        addGame: (gameId, playerId, name, place) =>
          set((state) => ({
            games: {
              ...state.games,
              [gameId]: {
                id: gameId,
                playerId: playerId,
                name: name,
                place: place,
              },
            },
          })),
        setConnection: (connection) =>
          set(() => ({
            connection: connection,
          })),
        setGameState: (gameId, status, currentTourId) =>
          set((state) => ({
            games: {
              ...state.games,
              [gameId]: {
                ...state.games[gameId],
                gameState: {
                  status: status,
                  currentTourId: currentTourId,
                },
              },
            },
          })),
      }),
      {
        name: "gamesStore",
      }
    )
  )
);
