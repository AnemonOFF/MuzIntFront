import { useEffect, useState } from "react";
import { createSignalRContext } from "react-signalr/signalr";
import { toast } from "sonner";
import { HubConnection } from "@microsoft/signalr";
import { Game } from "@/shared/types/game";

const SignalRPlayerContext = createSignalRContext();

export interface SignalRPlayerProviderProps {
  children: React.ReactNode;
  gameId: Game["id"];
  setConnection: (connection: HubConnection) => void;
}

export const SignalRPlayerProvider: React.FC<SignalRPlayerProviderProps> = ({
  children,
  gameId,
  setConnection,
}) => {
  const [reconnectToastId, setReconnectToastId] = useState<string | number>();

  useEffect(() => {
    return () => {
      if (reconnectToastId) toast.dismiss(reconnectToastId);
      else toast.dismiss();
    };
  }, [reconnectToastId]);

  const onError = async (error: Error | undefined) => {
    if (error?.message === "The connection was stopped during negotiation.")
      return;

    if (!reconnectToastId) {
      const toastId = toast.loading(
        "Соединение потеряно, пытаюсь переподключиться...",
        {
          richColors: true,
        }
      );
      setReconnectToastId(toastId);
    }
  };

  const onClose = () => {
    toast.error("Соединение потеряно, перезагрузите страницу", {
      id: reconnectToastId,
      richColors: true,
      duration: Infinity,
    });
    setReconnectToastId(undefined);
  };

  const onReconnect = (connection: HubConnection) => {
    setConnection(connection);
    toast.success("Переподключился!", {
      id: reconnectToastId,
      richColors: true,
    });
    setReconnectToastId(undefined);
  };

  const onOpen = (connection: HubConnection) => {
    setConnection(connection);
    toast.dismiss();
    if (reconnectToastId) {
      toast.success("Переподключился!", {
        id: reconnectToastId,
        richColors: true,
      });
    } else {
      toast.dismiss();
      toast.success("Подключился к серверу!", {
        richColors: true,
      });
    }
    setReconnectToastId(undefined);

    connection.invoke("JoinGame", gameId);
  };

  return (
    <SignalRPlayerContext.Provider
      url={new URL("hubs/player", import.meta.env.VITE_API_URL).toString()}
      automaticReconnect={[2000, 5000, 5000, 10000, 15000]}
      //
      onClosed={onClose}
      onError={onError}
      onOpen={onOpen}
      onReconnect={onReconnect}
      //
      withCredentials
    >
      {children}
    </SignalRPlayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayerSignalREffect = SignalRPlayerContext.useSignalREffect;
