import React from "react";

export interface GameWaitStartProps {}

const GameWaitStart: React.FC<GameWaitStartProps> = () => {
  return (
    <div className="">
      <p>Ожидаем начала игры</p>
    </div>
  );
};

export default React.memo(GameWaitStart);
