import { useGameInitStore } from "@/entities/game";
import { Game } from "@/shared/types/game";
import { GameContent } from "@/widgets/gameContent";
import React from "react";

export interface GamePageContentProps {
  gameId: Game["id"];
}

const GamePageContent: React.FC<GamePageContentProps> = ({ gameId }) => {
  useGameInitStore(gameId);

  return <GameContent gameId={gameId} />;
};

export default React.memo(GamePageContent);
