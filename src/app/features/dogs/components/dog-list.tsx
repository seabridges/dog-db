"use client";

import DogCard from "@/app/features/dogs/components/dog-card";
import { Dog } from "@/lib/schemas";
import React from "react";

type DogListProps = {
  dogs: Dog[];
};

const DogList: React.FC<DogListProps> = ({ dogs }) => {
  return (
    <>
      {dogs ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {dogs &&
            dogs.map((dog, index) => (
              <DogCard
                key={index}
                dog={dog}
                onFavorite={(id) => console.log("favoriting ", id)}
              />
            ))}
        </ul>
      ) : (
        "No dogs"
      )}
    </>
  );
};

export default DogList;
