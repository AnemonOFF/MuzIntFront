import { TourResults } from "@/entities/game";
import { usePlayerStore, useTourResultQuery } from "@/entities/player";
import { Game } from "@/shared/types/game";
import { GamePack } from "@/shared/types/gamePack";
import Loader from "@/shared/ui/loader";
import React from "react";
import { useShallow } from "zustand/react/shallow";

export interface TourResultedProps {
  gameId: Game["id"];
  gamePack: GamePack;
}

const TourResulted: React.FC<TourResultedProps> = ({ gameId, gamePack }) => {
  const { currentTourId, playerId } = usePlayerStore(
    useShallow((state) => ({
      currentTourId: state.games[gameId].gameState!.currentTourId!,
      playerId: state.games[gameId].playerId,
    }))
  );
  const { data: tourResult, isSuccess } = useTourResultQuery(
    playerId,
    currentTourId
  );
  const currentTour = gamePack.tours.find((t) => t.id === currentTourId)!;

  if (!isSuccess) return <Loader text="Загружаем результаты" />;

  return <TourResults tour={currentTour} tourResult={tourResult} />;
};

export default React.memo(TourResulted);
