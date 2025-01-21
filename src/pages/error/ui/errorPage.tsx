import React from "react";
import { useRouteError } from "react-router-dom";

export interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="mx-auto min-h-screen flex justify-center flex-col items-center">
      <h1>Уууупс!</h1>
      <p>Что-то пошло не так!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default React.memo(ErrorPage);
