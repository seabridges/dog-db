import { Dog } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo: React.FC<{ link?: boolean }> = ({ link = true }) => {
  const LogoDisplay = (
    <h1 className="flex items-center gap-1 text-xl font-bold">
      <Dog /> FetchFinder
    </h1>
  );

  return <>{link ? <Link href="/">{LogoDisplay}</Link> : LogoDisplay}</>;
};

export default Logo;
