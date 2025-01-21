import { usePlayerStore, useTourResultQuery } from "@/entities/player";
import { getRuDeclination } from "@/shared/lib/delination";
import { timeSpanToString } from "@/shared/lib/time";
import { cn } from "@/shared/lib/utils";
import { Game } from "@/shared/types/game";
import Loader from "@/shared/ui/loader";
import { Separator } from "@/shared/ui/separator";
import React from "react";
import { useShallow } from "zustand/react/shallow";

export interface TourResultedProps {
  gameId: Game["id"];
}

const TourResulted: React.FC<TourResultedProps> = ({ gameId }) => {
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

  if (!isSuccess) return <Loader text="Загружаем результаты" />;

  if (!tourResult.isAnswered) {
    return (
      <div className="space-y-5">
        <p>
          К сожалению вы не ответили на этот тур
          <br />И заработали 0 баллов
        </p>
      </div>
    );
  }

  const pointsText = getRuDeclination(tourResult.points, {
    one: "бал",
    few: "балла",
    many: "баллов",
  });

  const extraPointsText = getRuDeclination(tourResult.extraPoints, {
    one: "дополнительный",
    few: "дополнительных",
    many: "дополнительных",
  });

  const time = timeSpanToString(tourResult.answerTimeSpan!);

  return (
    <div className="space-y-5">
      <p>А вот и результаты тура:</p>
      {([] as JSX.Element[])
        .concat(
          ...tourResult.answers
            .map((a) => (
              <div
                key={a.questionId}
                className="grid grid-cols-[1fr_50px_75px] gap-2 items-center"
              >
                <div>{a.text}</div>
                <div className="font-bold">{a.order}</div>
                <div
                  className={cn("", {
                    "text-green-600": a.isCorrect,
                    "text-red-600": !a.isCorrect,
                  })}
                >
                  {a.isCorrect ? "Верно" : "Неверно"}
                </div>
              </div>
            ))
            .map((x) => [x, <Separator key={`separator_${x.key}`} />])
        )
        .slice(0, -1)}
      <p>Ты сделал ставку за {time}</p>
      <p>
        Ты получил {tourResult.points} {pointsText} и {tourResult.extraPoints}{" "}
        {extraPointsText}
      </p>
    </div>
  );
};

export default React.memo(TourResulted);
