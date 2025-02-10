"use client";

import { getDogBreeds } from "@/app/features/dogs/lib/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";

const BreedSelect: React.FC = () => {
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

  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by breed" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Breeds</SelectLabel>
            {breeds.map((breed, index) => (
              <SelectItem value={breed} key={index}>
                {breed}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default BreedSelect;
