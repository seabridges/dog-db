"use client";

import { MatchButton } from "@/app/features/dogs/components/dog-buttons";
import DogCard from "@/app/features/dogs/components/dog-card";
import SearchControls from "@/app/features/dogs/components/search-controls";
import {
  getDogs,
  searchDogs,
  SearchDogsResponse,
} from "@/app/features/dogs/lib/data";
import Loader from "@/components/loader";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dog, OrderOptions, SortOptions } from "@/lib/schemas";
import { Heart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type DogSearchProps = {
  searchParams: { [key: string]: string | undefined }; // @TODO: abstract
};

const DogSearch: React.FC<DogSearchProps> = ({ searchParams }) => {
  const router = useRouter();
  const currentParams = useSearchParams();

  const decodedBreeds = useMemo(
    () =>
      searchParams.breeds
        ? decodeURIComponent(searchParams.breeds as string)
        : null,
    [searchParams.breeds],
  );
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 25; // @TODO: make abstracted const?
  const offset = useMemo(
    () => (page > 1 ? (page - 1) * pageSize : 0),
    [page, pageSize],
  );

  const [filteredBreeds, setFilterBreeds] = useState<string[]>(
    decodedBreeds ? decodedBreeds.split(",") : [],
  );
  const [orderBy, setOrderBy] = useState<OrderOptions>(
    (searchParams.orderBy as OrderOptions) || "breed",
  );
  const [sortBy, setSortBy] = useState<SortOptions>(
    (searchParams.sortBy as SortOptions) || "asc",
  );

  const [data, setData] = useState<SearchDogsResponse>({
    resultIds: [],
    total: 0,
  });
  const dogIds = useMemo(() => data.resultIds, [data.resultIds]);

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const favoriteDogIds = useMemo(
    () => new Set(favoriteDogs.map((d) => d.id)),
    [favoriteDogs],
  );

  const fetchDogs = async () => {
    const data = await getDogs(dogIds);
    if (data) {
      setDogs(data);
    }
  };

  useEffect(() => {
    const fetchDogIds = async () => {
      const queryData = await searchDogs({
        breeds: filteredBreeds,
        from: offset,
        size: pageSize,
        orderBy: orderBy,
        sortBy: sortBy,
      });
      if (queryData) {
        console.log("queryData: ", queryData);
        setData(queryData);
      }
    };

    fetchDogIds();
  }, [searchParams]);

  useEffect(() => {
    fetchDogs();
  }, [dogIds]);

  const updateUrlParams = (favorites: Dog[]) => {
    const params = new URLSearchParams(currentParams);
    params.set("favorites", favorites.map((d) => d.id).join(","));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFavoriteChange = (dog: Dog) => {
    let updatedFavorites;
    if (favoriteDogs.some((d) => d.id === dog.id)) {
      updatedFavorites = favoriteDogs.filter((d) => d.id !== dog.id);
    } else {
      updatedFavorites = [...favoriteDogs, dog];
    }

    setFavoriteDogs(updatedFavorites);
    updateUrlParams(updatedFavorites);
  };

  const handleBreedsChange = (value: string[]) => {
    setFilterBreeds(value);
  };

  const handleOrderByChange = (value: OrderOptions) => {
    setOrderBy(value);
  };

  const handleSortByChange = (value: SortOptions) => {
    setSortBy(value);
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <MatchButton dogs={favoriteDogs} disabled={!favoriteDogs.length} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Heart
                  fill={!!favoriteDogs.length ? "#fb7185" : "rgba(0,0,0,0)"}
                  stroke={!!favoriteDogs.length ? "#fb7185" : "#09090b"} // @TODO: abstract
                />
                Favorites ({favoriteDogs.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Favorites</DialogTitle>
              </DialogHeader>
              {favoriteDogs.length ? (
                <>
                  <ul className="grid grid-cols-2 gap-2">
                    {favoriteDogs.map((dog) => (
                      <li key={`fav_dialog_${dog.id}`}>
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
        </div>
        <SearchControls
          onBreedChange={(v) => handleBreedsChange(v)}
          onOrderChange={(v) => handleOrderByChange(v)}
          onSortChange={(v) => handleSortByChange(v)}
          url={`/dogs?breeds=${filteredBreeds.join(",")}&orderBy=${orderBy}&sortBy=${sortBy}&favorites=${favoriteDogs.map((d) => d.id).join(",")}`} // @TODO: clean up
          values={{
            breeds: filteredBreeds,
            orderBy: orderBy,
            sortBy: sortBy,
          }}
        />
        {!!dogs.length ? (
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {dogs &&
              dogs.map((dog, index) => (
                <DogCard
                  key={index}
                  dog={dog}
                  onFavorite={(dog) => handleFavoriteChange(dog)}
                  isFavorite={favoriteDogIds.has(dog.id)} // @TODO: abstract
                />
              ))}
          </ul>
        ) : (
          <div className="flex justify-center py-8">
            <Loader visible={!dogs.length} />
          </div>
          // <div className="py-6 text-center">No dogs founds</div>
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
