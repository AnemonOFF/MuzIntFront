import { useGameQuery } from "@/entities/game";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface EnterGameProps {}

const EnterGame: React.FC<EnterGameProps> = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");
  const {
    data: game,
    isLoading,
    isSuccess,
    error,
    isError,
    refetch,
  } = useGameQuery(parseInt(gameId), false);

  useEffect(() => {
    if (isError && axios.isAxiosError(error) && error.response) {
      toast.error("Игра не найдена", {
        description: error.response.data.title,
      });
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && game) {
      navigate(`/game/${game.id}`);
    }
  }, [game, isSuccess, navigate]);

  return (
    <div className="border rounded-md p-5 space-y-5 md:min-w-[300px]">
      <h1 className="font-bold text-xl">Вход в игру</h1>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="gameId">Номер игры</Label>
        <Input
          type="number"
          id="gameId"
          placeholder="Введите номер игры"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button className="w-full" onClick={() => refetch()} disabled={isLoading}>
        Войти
      </Button>
    </div>
  );
};

export default React.memo(EnterGame);
