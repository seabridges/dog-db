"use client";

import { AboutButton, HelpButton, LoginButton } from "@/components/buttons";
import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

const HeaderButtons: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-2 sm:ml-auto">
        <LoginButton />
        <AboutButton />
        <HelpButton />
        <ModeToggle />
      </div>
    </>
  );
};

export default HeaderButtons;
