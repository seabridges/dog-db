"use client";

import BreedSelect from "@/app/features/dogs/components/breed-select";
import DogCard from "@/app/features/dogs/components/dog-card";
import SearchControls from "@/app/features/dogs/components/search-controls";
import {
  getDogs,
  searchDogs,
  SearchDogsResponse,
} from "@/app/features/dogs/lib/data";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dog } from "@/lib/schemas";
import { Heart } from "lucide-react";
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

  const handleFavoriteChange = (dog: Dog) => {
    if(favoriteDogs.some((d) => d === dog)){
      setFavoriteDogs([...favoriteDogs.filter((d) => d !== dog)])
    } else {
      setFavoriteDogs([...favoriteDogs, dog]);
    }
  };

  return (
    <>
      <div className="grid gap-6">
        <div>
          <SearchControls onBreedChange={(v) => setFilterBreeds(v)} />
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Heart />
                View Favorites ({favoriteDogs.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Favorites</DialogTitle>
              </DialogHeader>
              {favoriteDogs.length ? (
                <>
                  <ul className="grid gap-2">
                    {favoriteDogs.map((dog) => (
                      <li key={`fav_dialog_${dog.name}`}>
                        <DogCard dog={dog} variant="mini" 

                      onFavorite={(dog) => handleFavoriteChange(dog)}
                        isFavorite={favoriteDogs.some((d) => d === dog)} // @TODO: abstract
                          />
                      </li>
                    ))}
                  </ul>
                  <Button variant = "ghost" onClick={() => setFavoriteDogs([])}>Reset</Button>
                </>
              ) : (
                <p>You have not favorited any dogs yet</p>
              )}
            </DialogContent>
          </Dialog>
        </div>
        {dogs ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {dogs &&
              dogs.map((dog, index) => (
                <DogCard
                  key={index}
                  dog={dog}
                  onFavorite={(dog) => handleFavoriteChange(dog)}
                  isFavorite={favoriteDogs.some((d) => d === dog)} // @TODO: abstract
                />
              ))}
          </ul>
        ) : (
          "No dogs"
        )}
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
