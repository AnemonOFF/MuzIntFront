import { Game } from "@/shared/types/game";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { usePlayerSignalREffect } from "@/shared/api/signalR";
import { usePlayerStore } from "@/entities/player";
import { HubConnectionState } from "@microsoft/signalr";

const useGameInitStore = (gameId: Game["id"]) => {
  const connection = usePlayerStore((state) => state.connection);
  const { setGameState } = usePlayerStore(
    useShallow((state) => ({
      setGameState: state.setGameState,
    }))
  );

  useEffect(() => {
    if (connection?.state !== HubConnectionState.Connected) {
      console.log("Connection not ready!");
      return;
    }

    const initStatus = () => {
      toast.dismiss();
      connection
        ?.invoke("GetGameData", gameId)
        .then((data: Game) => {
          if (!data) {
            toast.error("Не удалось получить информацию об игре", {
              duration: Infinity,
              action: <Button onClick={location.reload}>Перезагрузить</Button>,
            });
          } else {
            setGameState(data.id, data.status, data.currentTourId);
          }
        })
        .catch(() => {
          toast.error("Не удалось получить информацию об игре", {
            duration: Infinity,
            action: <Button onClick={location.reload}>Перезагрузить</Button>,
          });
        });
    };

    initStatus();
  }, [gameId, connection, setGameState]);

  usePlayerSignalREffect(
    "GameStatusChanged",
    (data: Game) => {
      setGameState(data.id, data.status, data.currentTourId);
    },
    []
  );
};

export default useGameInitStore;
