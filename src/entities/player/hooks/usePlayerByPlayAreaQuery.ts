import { gamesController } from "@/shared/api";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { Player } from "@/shared/types/player";
import { useQuery } from "@tanstack/react-query";

const usePlayerByPlayAreaQuery = (
  gameId: Game["id"],
  playArea: Player["playArea"]
) => {
  return useQuery({
    queryKey: gameKey.player(gameId, playArea),
    queryFn: async () =>
      await gamesController.getPlayerByPlayArea(gameId, playArea),
  });
};

export default usePlayerByPlayAreaQuery;
