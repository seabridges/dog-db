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
      {/* <ul>
        {breeds.map((breed) => (
          <li>{breed}</li>
        ))}
      </ul> */}
    </>
  );
};

export default BreedList;
