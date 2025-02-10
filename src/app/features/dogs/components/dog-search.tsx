"use client";

import BreedSelect from "@/app/features/dogs/components/breed-select";
import DogList from "@/app/features/dogs/components/dog-list";
import SearchControls from "@/app/features/dogs/components/search-controls";
import {
  getDogs,
  searchDogs,
  SearchDogsResponse,
} from "@/app/features/dogs/lib/data";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { Dog } from "@/lib/schemas";
import React, { useEffect, useState } from "react";

type DogSearchProps = {};

const DogSearch: React.FC<DogSearchProps> = ({}) => {
  const [data, setData] = useState<SearchDogsResponse>({
    resultIds: [],
    total: 0,
  });
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredBreeds, setFilterBreeds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  const dogIds = data.resultIds;
  const totalCount = data.total;

  useEffect(() => {
    const fetchDogIds = async () => {
      const queryData = await searchDogs({ breeds: filteredBreeds });
      if (queryData) {
        console.log("queryData: ", queryData);
        setData(queryData);
      }
    };

    fetchDogIds();
  }, [filteredBreeds]);

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
          <SearchControls onBreedChange={(v) => setFilterBreeds(v)} />
        </div>
        <div></div>
        <DogList dogs={dogs} />
        <div className="py-4">
          <PaginationWithLinks
            page={1}
            totalCount={totalCount}
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
