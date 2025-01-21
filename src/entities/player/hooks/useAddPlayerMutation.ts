import { playersController } from "@/shared/api";
import { playerKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddPlayerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: playersController.addPlayer,
    onSuccess: (data) => {
      queryClient.setQueryData(playerKey.detail(data.id), data);
    },
  });
};

export default useAddPlayerMutation;
