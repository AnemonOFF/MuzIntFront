import { EnterGame } from "@/widgets/enterGame";
import React from "react";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="min-h-screen w-screen flex items-center max-md:items-start justify-center p-5">
      <EnterGame />
    </div>
  );
};

export default React.memo(HomePage);
