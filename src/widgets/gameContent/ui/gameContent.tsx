import { GameEnded, GameWaitStart, useGameQuery } from "@/entities/game";
import { useGamePackQuery } from "@/entities/gamePack";
import { usePlayerStore } from "@/entities/player";
import { Game, GameStatus } from "@/shared/types/game";
import Loader from "@/shared/ui/loader";
import React from "react";
import GamePlay from "./gamePlay";
import TourResulted from "./tourResulted";
import TourEnded from "./tourEnded";

export interface GameContentProps {
  gameId: Game["id"];
}

const GameContent: React.FC<GameContentProps> = ({ gameId }) => {
  const storeGame = usePlayerStore((state) => state.games[gameId]);
  const { data: game, isSuccess: isGameLoaded } = useGameQuery(gameId);
  const { data: gamePack, isSuccess: isGamePackLoaded } = useGamePackQuery(
    game!.gamePackId,
    isGameLoaded
  );

  if (!storeGame.gameState || !isGameLoaded || !isGamePackLoaded)
    return <Loader text="Загрузка игры" />;

  return (
    <div className="min-h-screen w-screen p-5 flex items-center justify-center">
      {storeGame.gameState.status === GameStatus.Ended ? (
        <GameEnded gameId={gameId} gamePack={gamePack} />
      ) : storeGame.gameState.status === GameStatus.WaitForStart ? (
        <GameWaitStart />
      ) : storeGame.gameState.status === GameStatus.TourInProgress ? (
        <GamePlay game={game} gamePack={gamePack} />
      ) : storeGame.gameState.status === GameStatus.TourEnd ? (
        <TourEnded gameId={game.id} gamePack={gamePack} />
      ) : storeGame.gameState.status === GameStatus.TourResults ? (
        <TourResulted gameId={game.id} gamePack={gamePack} />
      ) : storeGame.gameState.status === GameStatus.Results ? (
        "Результаты"
      ) : null}
    </div>
  );
};

export default React.memo(GameContent);
