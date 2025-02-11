import { Bone } from "lucide-react";
import React from "react";

type LoaderProps = {
  visible: boolean;
};

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-6 font-semibold">
        <Bone className="h-12 w-12 animate-spin" />
        Loading
      </div>
    </>
  );
};

export default Loader;
