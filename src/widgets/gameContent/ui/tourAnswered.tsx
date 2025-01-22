import { timeSpanToString } from "@/shared/lib/time";
import { TourResult } from "@/shared/types/player";
import { Separator } from "@/shared/ui/separator";
import React from "react";

export interface TourAnsweredProps {
  tourResult: TourResult;
}

const TourAnswered: React.FC<TourAnsweredProps> = ({ tourResult }) => {
  const time = timeSpanToString(tourResult.answerTimeSpan!);

  return (
    <div className="space-y-5">
      <p>Голос твоей интуиции в этом туре:</p>
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
      <p>Ты сделал ставку за {time}</p>
    </div>
  );
};

export default React.memo(TourAnswered);
