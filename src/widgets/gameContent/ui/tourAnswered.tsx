import { timeSpanToString } from "@/shared/lib/time";
import { TourResult } from "@/shared/types/player";
import { Separator } from "@/shared/ui/separator";
import React from "react";

export interface TourAnsweredProps {
  tourResult: TourResult;
  takeIntoResult: boolean;
}

const TourAnswered: React.FC<TourAnsweredProps> = ({
  tourResult,
  takeIntoResult,
}) => {
  const time = timeSpanToString(tourResult.answerTimeSpan!);

  return (
    <div className="space-y-5">
      <p className="font-semibold">Голос твоей интуиции в этом туре:</p>
      {!takeIntoResult && (
        <p className="font-semibold">
          Результаты этого тура не идут в общий зачёт
        </p>
      )}
      {([] as JSX.Element[])
        .concat(
          ...tourResult.answers
            .map((a) => (
              <div
                key={a.questionId}
                className="flex gap-2 items-center justify-between"
              >
                <div>{a.text}</div>
                <div className="font-bold">{a.order}</div>
              </div>
            ))
            .map((x) => [x, <Separator />])
        )
        .slice(0, -1)}
      <p>Твоё время ставок - {time}</p>
    </div>
  );
};

export default React.memo(TourAnswered);
