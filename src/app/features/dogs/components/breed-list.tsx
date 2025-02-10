"use client";

import { getDogBreeds } from "@/app/features/dogs/lib/actions";
import React, { useEffect, useState } from "react";

const BreedList: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const data = await getDogBreeds();
      if (data) {
        setBreeds(data);
      }
    };

    fetchBreeds();
  }, []);

  console.log("breeds: ", breeds);

  return (
    <>
      <h2 className="text-lg">Breeds</h2>
      <ul className="grid grid-cols-3">
        {breeds.map((breed, index) => (
          <li key={index}>{breed}</li>
        ))}
      </ul>
    </>
  );
};

export default BreedList;
