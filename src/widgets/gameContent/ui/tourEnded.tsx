import { usePlayerStore, useTourResultQuery } from "@/entities/player";
import { Game } from "@/shared/types/game";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import TourAnswered from "./tourAnswered";
import { GamePack } from "@/shared/types/gamePack";
import Loader from "@/shared/ui/loader";

export interface TourEndedProps {
  gameId: Game["id"];
  gamePack: GamePack;
}

const TourEnded: React.FC<TourEndedProps> = ({ gameId, gamePack }) => {
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

  if (!isSuccess) return <Loader text="Загружаем ответы" />;

  if (!tourResult?.isAnswered) {
    return (
      <p>
        К сожалению вы не ответили на этот тур
        <br />И заработали 0 баллов
      </p>
    );
  }

  return (
    <TourAnswered
      tourResult={tourResult}
      takeIntoResult={currentTour.takeIntoResult}
    />
  );
};

export default React.memo(TourEnded);
