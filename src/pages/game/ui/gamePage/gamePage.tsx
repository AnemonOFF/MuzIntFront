import { GameNotFound, useGameQuery } from "@/entities/game";
import Loader from "@/shared/ui/loader";
import React from "react";
import { useParams } from "react-router-dom";
import GamePlace from "./gamePlace";

export interface GamePageProps {}

const GamePage: React.FC<GamePageProps> = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const id = parseInt(gameId!);
  const { isLoading, isError } = useGameQuery(id);

  if (isLoading) return <Loader text="Загрузка игры" />;
  if (isError) {
    return (
      <div className="min-h-screen w-screen p-5">
        <GameNotFound />
      </div>
    );
  }

  return <GamePlace gameId={id} />;
};

export default React.memo(GamePage);
