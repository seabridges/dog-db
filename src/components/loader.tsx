import { Bone } from "lucide-react";
import React from "react";

type LoaderProps = {
  visible: boolean;
};

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <>
      <div>
        <Bone className="h-12 w-12 animate-spin" />
      </div>
    </>
  );
};

export default Loader;
