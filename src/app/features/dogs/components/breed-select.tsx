"use client";

import { getDogBreeds } from "@/app/features/dogs/lib/data";
import { MultiSelect } from "@/components/multi-select";
import React, { useEffect, useState } from "react";

const BreedSelect: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const data = await getDogBreeds();
      if (data) {
        setBreeds(data);
      }
    };

    fetchBreeds();
  }, []);

  const mappedBreeds = breeds.map((breed) => ({ value: breed, label: breed }));

  return (
    <>
      <MultiSelect
        options={mappedBreeds}
        onValueChange={setSelectedBreeds}
        defaultValue={selectedBreeds}
        placeholder="Select breeds"
        variant="inverted"
        maxCount={3}
      />
    </>
  );
};

export default BreedSelect;
