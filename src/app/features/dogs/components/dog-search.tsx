"use client";

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
import { Separator } from "@/components/ui/separator";
import { Dog } from "@/lib/schemas";
import { Heart, PawPrint } from "lucide-react";
import React, { useEffect, useState } from "react";

type DogSearchProps = {
  searchParams: { [key: string]: string | undefined }; // @TODO: abstract
};

const DogSearch: React.FC<DogSearchProps> = ({ searchParams }) => {
  const [data, setData] = useState<SearchDogsResponse>({
    resultIds: [],
    total: 0,
  });
  const decodedBreeds = (searchParams.breeds as string)
    ? decodeURIComponent(searchParams.breeds as string)
    : null;
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredBreeds, setFilterBreeds] = useState<string[]>(
    decodedBreeds ? decodedBreeds.split(",") : [],
  );
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 25; // @TODO: make abstracted const?

  const dogIds = data.resultIds;
  const offset = page > 1 ? (page - 1) * pageSize : 0;

  console.log("filteredBreeds: ", filteredBreeds);

  useEffect(() => {
    const fetchDogIds = async () => {
      const queryData = await searchDogs({
        breeds: filteredBreeds,
        from: offset,
        size: pageSize,
      });
      if (queryData) {
        console.log("queryData: ", queryData);
        setData(queryData);
      }
    };

    fetchDogIds();
  }, [searchParams]);

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
    if (favoriteDogs.some((d) => d === dog)) {
      setFavoriteDogs([...favoriteDogs.filter((d) => d !== dog)]);
    } else {
      setFavoriteDogs([...favoriteDogs, dog]);
    }
  };

  return (
    <>
      <div className="grid gap-6">
        <div>
          <div>total: {data.total}</div>
          <div>page: {page}</div>
          <div>offset: {offset}</div>
          <div>1st: {dogs[0]?.name}</div>
        </div>

        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Heart
                  fill={!!favoriteDogs.length ? "#fb7185" : "rgba(0,0,0,0)"}
                  stroke={!!favoriteDogs.length ? "#fb7185" : "#09090b"} // @TODO: abstract
                />
                View Favorites ({favoriteDogs.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Favorites</DialogTitle>
              </DialogHeader>
              {favoriteDogs.length ? (
                <>
                  <ul className="grid grid-cols-2 gap-2">
                    {favoriteDogs.map((dog) => (
                      <li key={`fav_dialog_${dog.name}`}>
                        <DogCard
                          dog={dog}
                          variant="mini"
                          onFavorite={(dog) => handleFavoriteChange(dog)}
                          isFavorite={favoriteDogs.some((d) => d === dog)} // @TODO: abstract
                        />
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" onClick={() => setFavoriteDogs([])}>
                    Reset
                  </Button>
                </>
              ) : (
                <p>You have not favorited any dogs yet</p>
              )}
            </DialogContent>
          </Dialog>
          <div className="ml-auto">
            <Button disabled={!favoriteDogs.length}>
              <PawPrint />
              Get Matches!
            </Button>
          </div>
        </div>
        <SearchControls
          onBreedChange={(v) => setFilterBreeds(v)}
          url={`/dogs?breeds=${filteredBreeds.join(",")}`}
        />
        {dogs ? (
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            page={page}
            totalCount={data.total}
            pageSize={pageSize}
            pageSizeSelectOptions={{
              pageSizeOptions: [25, 50],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DogSearch;
