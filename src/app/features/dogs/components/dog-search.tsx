"use client";

import BreedSelect from "@/app/features/dogs/components/breed-select";
import DogList from "@/app/features/dogs/components/dog-list";
import SearchControls from "@/app/features/dogs/components/search-controls";
import { getDogs, searchDogs } from "@/app/features/dogs/lib/data";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { Dog } from "@/lib/schemas";
import React, { useEffect, useState } from "react";

type DogSearchProps = {};

const DogSearch: React.FC<DogSearchProps> = ({}) => {
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredBreeds, setFilterBreeds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchDogIds = async () => {
      const data = await searchDogs({});
      if (data) {
        console.log("data: ", data);
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

  return (
    <>
      <div className="grid gap-6">
        <div>
          <SearchControls />
        </div>
        <DogList dogs={dogs} />
        <div className="py-4">
          <PaginationWithLinks
            page={1}
            totalCount={25}
            pageSize={20}
            pageSizeSelectOptions={{
              pageSizeOptions: [10, 20, 30, 40],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DogSearch;
