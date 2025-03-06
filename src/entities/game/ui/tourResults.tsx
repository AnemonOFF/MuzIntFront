import { getRuDeclination } from "@/shared/lib/delination";
import { timeSpanToString } from "@/shared/lib/time";
import { cn } from "@/shared/lib/utils";
import { Tour } from "@/shared/types/gamePack";
import { TourResult } from "@/shared/types/player";
import { Separator } from "@/shared/ui/separator";
import React from "react";

export interface TourResultsProps {
  tour: Tour;
  tourResult: TourResult;
}

const TourResults: React.FC<TourResultsProps> = ({ tour, tourResult }) => {
  if (!tourResult.isAnswered) {
    return (
      <div className="space-y-5">
        {!tour.takeIntoResult && (
          <p className="font-semibold">
            Результаты этого тура не идут в общий зачёт
          </p>
        )}
        <p>
          К сожалению вы не ответили на этот тур
          <br />И заработали 0 баллов
        </p>
      </div>
    );
  }

  const pointsText = getRuDeclination(tourResult.points, {
    one: "балл",
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
      {!tour.takeIntoResult && (
        <p className="font-semibold">
          Результаты этого тура не идут в общий зачёт
        </p>
      )}
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
      <p>Твоё время ставок - {time}</p>
      <p>
        Ты получил {tourResult.points} {pointsText} и {tourResult.extraPoints}{" "}
        {extraPointsText} ({tourResult.points + tourResult.extraPoints} всего)
      </p>
    </div>
  );
};

export default TourResults;
