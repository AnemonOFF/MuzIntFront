import { playersController } from "@/shared/api";
import { playerKey } from "@/shared/lib/queryKeyFactory";
import { Tour } from "@/shared/types/gamePack";
import { Player } from "@/shared/types/player";
import { useQuery } from "@tanstack/react-query";

const useTourResultQuery = (
  playerId: Player["id"],
  tourId: Tour["id"],
  enabled?: boolean
) => {
  return useQuery({
    queryKey: playerKey.tourResult(playerId, tourId),
    queryFn: async () =>
      await playersController.getTourAnswers(playerId, tourId),
    enabled: enabled,
  });
};

export default useTourResultQuery;
