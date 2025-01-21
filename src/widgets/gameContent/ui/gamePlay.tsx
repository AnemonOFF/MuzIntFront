import {
  useAnswerMutation,
  usePlayerStore,
  useTourResultQuery,
} from "@/entities/player";
import { Game } from "@/shared/types/game";
import { GamePack, Question } from "@/shared/types/gamePack";
import React, { useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import TourAnswered from "./tourAnswered";
import { Answer } from "@/shared/types/player";
import { toast } from "sonner";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import ConfirmModal from "@/shared/ui/confirmModal";
import { Separator } from "@/shared/ui/separator";

export interface GamePlayProps {
  game: Game;
  gamePack: GamePack;
}

const GamePlay: React.FC<GamePlayProps> = ({ game, gamePack }) => {
  const { currentTourId, playerId } = usePlayerStore(
    useShallow((state) => ({
      currentTourId: state.games[game.id].gameState!.currentTourId!,
      playerId: state.games[game.id].playerId,
    }))
  );
  const { data: tourResult } = useTourResultQuery(playerId, currentTourId);
  const currentTour = gamePack.tours.find((t) => t.id === currentTourId)!;
  const blocks = currentTour.blocks.sort((a, b) => a.order - b.order);
  const [block, setBlock] = useState(() => blocks[0]);
  const isLastBlock = block.id === blocks[blocks.length - 1].id;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { mutate: answerTour, isPending } = useAnswerMutation();

  const resetTour = () => {
    setBlock(blocks[0]);
    setAnswers([]);
  };

  const setAnswer = (questionId: Question["id"], order: number) => {
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== questionId),
      {
        questionId,
        order,
      },
    ]);
  };

  const sendAnswers = () => {
    answerTour(
      {
        playerId: playerId,
        tourId: currentTourId,
        answers: answers,
      },
      {
        onError: (err) => {
          if (axios.isAxiosError(err) && err.response) {
            const errors = Object.values(err.response.data.errors) as string[];
            toast.error(errors[0]);
          } else toast.error("Не удалось сохранить ответы");
        },
      }
    );
  };

  const nextBlock = () => {
    if (
      !block.questions.every((q) => answers.some((a) => a.questionId === q.id))
    ) {
      toast.error("Вы не ответили на все вопросы текущего блока");
      return;
    }
    const currentBlockIndex = blocks.indexOf(block);
    setBlock(blocks[currentBlockIndex + 1]);
  };

  const questions = useMemo(
    () =>
      ([] as JSX.Element[])
        .concat(
          ...block.questions
            // .map((question) => ({ ...question, sort: Math.random() }))
            // .sort((a, b) => a.sort - b.sort)
            .map((question) => (
              <div
                className="grid grid-cols-[1fr_75px] gap-2"
                key={question.id}
              >
                <span>{question.text}</span>
                <Select
                  onValueChange={(value) =>
                    setAnswer(question.id, parseInt(value))
                  }
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {block.answerVariants.map((variant) => (
                      <SelectItem
                        value={variant.toString()}
                        key={`q_${question.id}_a_${variant}`}
                      >
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))
            .map((x) => [x, <Separator />])
        )
        .slice(0, -1),
    [block.answerVariants, block.questions, isPending]
  );

  if (tourResult?.isAnswered) {
    return <TourAnswered tourResult={tourResult} />;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl">
        <span className="font-bold">Тур {currentTour.order}</span>:{" "}
        {currentTour.name}
      </h1>
      <p>
        Что говорит ваша интуиция?
        <br />В какой последовательности прозвучат эти треки сегодня?
      </p>
      {questions}
      <div className="flex max-md:flex-col gap-5 md:justify-between">
        <ConfirmModal
          trigger={
            <Button variant="outline" disabled={isPending}>
              Начать сначала
            </Button>
          }
          text="Вы уверены, что хотите сбросить все ответы и начать тур сначала?"
          onConfirm={resetTour}
        />
        {isLastBlock ? (
          <Button onClick={sendAnswers} disabled={isPending}>
            Готово
          </Button>
        ) : (
          <Button onClick={nextBlock} disabled={isPending}>
            Далее
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(GamePlay);
