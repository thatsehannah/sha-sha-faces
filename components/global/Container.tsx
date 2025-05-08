import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={cn("mx-auto max-w-6xl xl:max-w-7xl px-4 md:px-8", className)}
    >
      {children}
    </div>
  );
};

export default Container;
