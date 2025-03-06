import { useGameResultQuery, usePlayerStore } from "@/entities/player";
import { Game } from "@/shared/types/game";
import { GamePack } from "@/shared/types/gamePack";
import { Button } from "@/shared/ui/button";
import Loader from "@/shared/ui/loader";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { IconLink } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

export interface GameEndedProps {
  gameId: Game["id"];
  gamePack: GamePack;
}

const GameEnded: React.FC<GameEndedProps> = ({ gameId, gamePack }) => {
  const ref = encodeURIComponent(window.location.origin);
  const playerId = usePlayerStore((state) => state.games[gameId]?.playerId);
  const { data: gameResult, isSuccess } = useGameResultQuery(
    playerId,
    gameId,
    !!playerId
  );

  if (playerId && !isSuccess) return <Loader text="Загружаем результаты" />;

  const resultTours = gameResult
    ? gamePack.tours
        .filter((t) => t.takeIntoResult)
        .sort((a, b) => a.order - b.order)
        .map((t) => ({
          ...gameResult.find((tr) => tr.tourId === t.id)!,
          name: t.name,
        }))
    : null;
  const total = resultTours?.reduce(
    (sum, tour) => sum + tour.points + tour.extraPoints,
    0
  );

  return (
    <div className="space-y-5">
      <img
        src="/finish.png"
        alt="финишный флаг"
        className="h-36 object-contain aspect-square mx-auto"
      />
      <p>
        Спасибо за участие, сегодняшняя игра окончена! Приходи на следующие
        игры!
      </p>
      <div className="flex items-center gap-5">
        <p className="">Расписание следующих игр и регистрация здесь:</p>
        <Button variant="default" asChild>
          <Link to={`https://muzint.ru/?ref=${ref}`}>
            <IconLink /> Перейти
          </Link>
        </Button>
      </div>
      {resultTours && (
        <>
          <p className="font-semibold">Ваши результаты в этой игре:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тур</TableHead>
                <TableHead>Баллы</TableHead>
                <TableHead>Доп</TableHead>
                <TableHead>Всего</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultTours.map((t) => (
                <TableRow key={t.tourId}>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.points}</TableCell>
                  <TableCell>{t.extraPoints}</TableCell>
                  <TableCell>{t.points + t.extraPoints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Итог</TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
};

export default React.memo(GameEnded);
