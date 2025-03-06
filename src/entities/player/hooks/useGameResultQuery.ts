import { playersController } from "@/shared/api";
import { playerKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { Player } from "@/shared/types/player";
import { useQuery } from "@tanstack/react-query";

const useGameResultQuery = (
  playerId: Player["id"],
  gameId: Game["id"],
  enabled?: boolean
) => {
  return useQuery({
    queryKey: playerKey.gameResult(playerId, gameId),
    queryFn: async () =>
      await playersController.getGameResults(playerId, gameId),
    enabled: enabled,
  });
};

export default useGameResultQuery;
