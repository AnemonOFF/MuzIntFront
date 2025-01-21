import { useAddPlayerMutation, usePlayerStore } from "@/entities/player";
import { Game } from "@/shared/types/game";
import { Alert, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import axios from "axios";
import React, { useState } from "react";
import GamePageContent from "./gamePageContent";
import { SignalRPlayerProvider } from "@/shared/api/signalR";

export interface GamePlaceProps {
  gameId: Game["id"];
}

const GamePlace: React.FC<GamePlaceProps> = ({ gameId }) => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isGameDataExist = usePlayerStore((state) => !!state.games[gameId]);
  const addGameToStore = usePlayerStore((state) => state.addGame);
  const setConnection = usePlayerStore((state) => state.setConnection);
  const { mutate: addPlayer, isPending } = useAddPlayerMutation();

  if (isGameDataExist) {
    return (
      <SignalRPlayerProvider gameId={gameId} setConnection={setConnection}>
        <GamePageContent gameId={gameId} />
      </SignalRPlayerProvider>
    );
  }

  const onEnter = () => {
    addPlayer(
      {
        gameId: gameId,
        name: name,
        place: place,
      },
      {
        onSuccess: (data) => {
          addGameToStore(gameId, data.id, data.name, data.playArea);
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response) {
            const errors = Object.values(
              error.response.data.errors
            ) as string[];
            setErrorMessage(errors[0]);
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-screen p-5 flex items-center max-md:items-start justify-center">
      <div className="border rounded-md p-5 space-y-5 md:min-w-[300px]">
        <h1 className="font-bold text-xl">Вход в игру</h1>
        <div className="grid w-full gap-2">
          <Label htmlFor="game_playerName">Имя</Label>
          <Input
            id="game_playerName"
            type="text"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            minLength={2}
            required
          />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="game_playerPlace">Место</Label>
          <Input
            id="game_playerPlace"
            type="number"
            placeholder="Введите ваше место"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <Button className="w-full" onClick={onEnter} disabled={isPending}>
          Войти
        </Button>
        {errorMessage && (
          <Alert className="bg-red-400/20">
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default React.memo(GamePlace);
