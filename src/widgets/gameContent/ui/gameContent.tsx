import { GameEnded, GameWaitStart, useGameQuery } from "@/entities/game";
import { useGamePackQuery } from "@/entities/gamePack";
import { usePlayerStore } from "@/entities/player";
import { Game, GameStatus } from "@/shared/types/game";
import Loader from "@/shared/ui/loader";
import React from "react";
import GamePlay from "./gamePlay";
import TourResulted from "./tourResulted";

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

  if (storeGame.gameState.status === GameStatus.Ended) {
    return (
      <div className="min-h-screen w-screen p-5 flex items-center justify-center">
        <GameEnded gameId={gameId} />
      </div>
    );
  }

  if (storeGame.gameState.status === GameStatus.WaitForStart) {
    return (
      <div className="min-h-screen w-screen p-5 flex items-center justify-center">
        <GameWaitStart />
      </div>
    );
  }

  if (storeGame.gameState.status === GameStatus.TourInProgress) {
    return (
      <div className="min-h-screen w-screen p-5 flex items-center justify-center">
        <GamePlay game={game} gamePack={gamePack} />
      </div>
    );
  }

  if (storeGame.gameState.status === GameStatus.TourResults) {
    return (
      <div className="min-h-screen w-screen p-5 flex items-center justify-center">
        <TourResulted gameId={game.id} gamePack={gamePack} />
      </div>
    );
  }

  if (storeGame.gameState.status === GameStatus.Results) {
    return (
      <div className="min-h-screen w-screen p-5 flex items-center justify-center">
        Результаты
      </div>
    );
  }
};

export default React.memo(GameContent);
