import { playersController } from "@/shared/api";
import { playerKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAnswerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: playersController.answerTour,
    onSuccess: (data) => {
      queryClient.setQueryData(
        playerKey.tourResult(data.playerId, data.tourId),
        data
      );
    },
  });
};

export default useAnswerMutation;
