import { lazy, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./shared/ui/sonner";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { ErrorPage } from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const HomePage = lazy(() => import("./pages/home/ui/homePage"));
      return {
        Component: HomePage,
      };
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/game",
        // element: <FindGamePage />,
        async lazy() {
          const FindGamePage = lazy(
            () => import("./pages/game/ui/findGamePage")
          );
          return {
            Component: FindGamePage,
          };
        },
      },
      {
        path: "/game/:gameId",
        async lazy() {
          const GamePage = lazy(
            () => import("./pages/game/ui/gamePage/gamePage")
          );
          return {
            Component: GamePage,
          };
        },
      },
    ],
  },
]);

export default function Providers() {
  const [queryClient] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            if (err.response && err.response?.status >= 500)
              toast.error("Сервер не смог обработать запрос");
          } else {
            toast.error("Не удалось выполнить запрос");
          }
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          retry: (count, error) => {
            if (
              axios.isAxiosError(error) &&
              error.response &&
              error.response.status < 500
            )
              return false;
            if (count >= 3) return false;
            if (!axios.isAxiosError(error) || !error.response) return true;

            return (
              error.response.status !== 401 && error.response.status !== 404
            );
          },
        },
        mutations: {
          retry: (count, error) => {
            if (count >= 3) return false;
            if (!axios.isAxiosError(error) || !error.response) return true;

            return (
              error.response.status !== 401 && error.response.status !== 404
            );
          },
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
