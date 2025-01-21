import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export interface GameEndedProps {
  gameId: Game["id"];
}

const GameEnded: React.FC<GameEndedProps> = () => {
  return (
    <div className="space-y-5">
      <p>Данная игра закончена, спасибо за участие, ждём вас снова!</p>
      <Button variant="outline" asChild>
        <Link to="/">На главную</Link>
      </Button>
    </div>
  );
};

export default React.memo(GameEnded);
