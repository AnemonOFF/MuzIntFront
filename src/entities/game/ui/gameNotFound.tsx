import { Button } from "@/shared/ui/button";
import { IconExclamationCircle } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

export interface GameNotFoundProps {}

const GameNotFound: React.FC<GameNotFoundProps> = () => {
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <IconExclamationCircle />
        <span>Игра не найдена или произошла ошибка</span>
      </div>
      <Button variant="outline" onClick={location.reload}>
        Обновить
      </Button>
      <Button asChild>
        <Link to="/">На главную</Link>
      </Button>
    </div>
  );
};

export default React.memo(GameNotFound);
