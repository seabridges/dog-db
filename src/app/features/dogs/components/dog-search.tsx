"use client";

import BreedList from "@/app/features/dogs/components/breed-list";
import DogList from "@/app/features/dogs/components/dog-list";
import React from "react";

type DogSearchProps = {};

const DogSearch: React.FC<DogSearchProps> = ({}) => {
  return (
    <>
      <BreedList />
      <DogList />
    </>
  );
};

export default DogSearch;
