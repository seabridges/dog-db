"use client";

import DogCard from "@/app/features/dogs/components/dog-card";
import {
  getDogBreeds,
  getDogs,
  searchDogs,
} from "@/app/features/dogs/lib/data";
import { Dog } from "@/lib/schemas";
import React, { useEffect, useState } from "react";

const DogList: React.FC = () => {
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogIds = async () => {
      const data = await searchDogs();
      if (data) {
        setDogIds(data.resultIds);
      }
    };

    fetchDogIds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      const data = await getDogs(dogIds);
      if (data) {
        setDogs(data);
      }
    };

    fetchDogs();
  }, [dogIds]);

  console.log("dogs: ", dogs);

  // console.log("dogIds: ", dogIds);

  return (
    <>
      <h2 className="text-lg">Dogs</h2>
      {dogs ? (
        <ul className="grid grid-cols-3 gap-4">
          {dogs && dogs.map((dog, index) => <DogCard key={index} dog={dog} />)}
        </ul>
      ) : (
        "No dogs"
      )}
    </>
  );
};

export default DogList;
