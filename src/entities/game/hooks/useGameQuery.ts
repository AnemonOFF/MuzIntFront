import { gamesController } from "@/shared/api";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { useQuery } from "@tanstack/react-query";

const useGameQuery = (id: Game["id"], enabled?: boolean) => {
  return useQuery({
    queryKey: gameKey.detail(id),
    queryFn: async () => await gamesController.getGame(id),
    enabled: enabled,
  });
};

export default useGameQuery;
