import { Dog } from "lucide-react";
import React from "react";

const Logo: React.FC = () => {
  return (
    <>
      <h1 className="flex items-center gap-1 text-xl font-bold">
        <Dog /> FetchFinder
      </h1>
    </>
  );
};

export default Logo;
