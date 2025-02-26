import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import { IconLink } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

export interface GameEndedProps {
  gameId: Game["id"];
}

const GameEnded: React.FC<GameEndedProps> = () => {
  const ref = encodeURIComponent(window.location.origin);

  return (
    <div className="space-y-5">
      <p>
        Спасибо за участие, сегодняшняя игра окончена! Приходи на следующие
        игры!
      </p>
      <div className="flex items-center gap-5">
        <p className="">Расписание следующих игр и регистрация здесь:</p>
        <Button variant="default" asChild>
          <Link to={`https://muzint.ru/?ref=${ref}`}>
            <IconLink /> Перейти
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default React.memo(GameEnded);
