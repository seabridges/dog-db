import { Bone } from "lucide-react";
import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-4 text-xl font-semibold">
        <Bone className="animate-spin" />
        Loading
      </div>
    </>
  );
};

export default Loader;
