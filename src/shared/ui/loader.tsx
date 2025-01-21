import React from "react";
import { cn } from "../lib/utils";
import { IconLoader } from "@tabler/icons-react";

export interface LoaderProps {
  className?: string;
  textClassName?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ className, textClassName, text }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <IconLoader className="animate-spin" />
      {text && <p className={textClassName}>{text}</p>}
    </div>
  );
};

export default React.memo(Loader);
