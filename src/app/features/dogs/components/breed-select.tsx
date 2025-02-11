"use client";

import { getDogBreeds } from "@/app/features/dogs/lib/data";
import { MultiSelect } from "@/components/multi-select";
import React, { useEffect, useState } from "react";

type BreedSelectProps = {
  onSelect: (values: string[]) => void;
  value: string[];
};

const BreedSelect: React.FC<BreedSelectProps> = ({ onSelect, value }) => {
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

  const mappedBreeds = breeds.map((breed) => ({ value: breed, label: breed }));

  return (
    <>
      <MultiSelect
        options={mappedBreeds}
        onValueChange={onSelect}
        defaultValue={value}
        placeholder="Select breeds"
        variant="inverted"
        maxCount={3}
      />
    </>
  );
};

export default BreedSelect;
