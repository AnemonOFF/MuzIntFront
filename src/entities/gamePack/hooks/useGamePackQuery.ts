import { gamePacksController } from "@/shared/api";
import { gamePackKey } from "@/shared/lib/queryKeyFactory";
import { GamePack } from "@/shared/types/gamePack";
import { useQuery } from "@tanstack/react-query";

const useGamePackQuery = (id: GamePack["id"], enabled?: boolean) => {
  return useQuery({
    queryKey: gamePackKey.detail(id),
    queryFn: async () => await gamePacksController.getGamePack(id),
    enabled: enabled,
  });
};

export default useGamePackQuery;
