"use client";

import {
  MatchButton,
  ViewFavoritesButton,
} from "@/app/features/dogs/components/dog-buttons";
import DogCard from "@/app/features/dogs/components/dog-card";
import SearchControls from "@/app/features/dogs/components/search-controls";
import {
  getDogs,
  searchDogs,
  SearchDogsResponse,
} from "@/app/features/dogs/lib/data";
import Loader from "@/components/loader";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { DEFAULT_VALUES } from "@/lib/config";
import { Dog, OrderOptions, SortOptions } from "@/lib/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type DogSearchProps = {
  searchParams: Record<string, string | undefined>;
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
  const page = parseInt(searchParams.page as string) || DEFAULT_VALUES.page;
  const pageSize =
    parseInt(searchParams.pageSize as string) || DEFAULT_VALUES.pageSize;
  const offset = useMemo(
    () => (page > 1 ? (page - 1) * pageSize : 0),
    [page, pageSize],
  );

  const [zip, setZip] = useState<string | null>(searchParams.zip as string);
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
  const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  const fetchDogs = async (
    ids: string[],
    setter: React.Dispatch<React.SetStateAction<Dog[]>>,
  ) => {
    const data = await getDogs(ids);
    if (data) {
      setter(data);
    }
  };

  useEffect(() => {
    const fetchDogIds = async () => {
      const queryData = await searchDogs({
        zipCodes: zip ? [zip] : null,
        breeds: filteredBreeds,
        from: offset,
        size: pageSize,
        orderBy: orderBy,
        sortBy: sortBy,
      });
      if (queryData) {
        setData(queryData);
      }
    };

    fetchDogIds();
    setFavoriteDogIds(
      searchParams.favorites ? searchParams.favorites.split(",") : [],
    );
  }, [searchParams]);

  useEffect(() => {
    fetchDogs(dogIds, setDogs);
  }, [dogIds]);

  useEffect(() => {
    fetchDogs(favoriteDogIds, setFavoriteDogs);
  }, [favoriteDogIds]);

  const updateUrlParams = (favorites: string[]) => {
    const params = new URLSearchParams(currentParams);
    params.set("favorites", Array.from(favorites).join(","));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFavoriteChange = (dog: Dog) => {
    let newFavoriteDogs;
    if (favoriteDogs.some((d) => d.id === dog.id)) {
      newFavoriteDogs = favoriteDogs.filter((d) => d.id !== dog.id);
    } else {
      newFavoriteDogs = [...favoriteDogs, dog];
    }
    setFavoriteDogs(newFavoriteDogs);
    updateUrlParams(newFavoriteDogs.map((d) => d.id));
  };

  const handleFavoriteReset = () => {
    setFavoriteDogs([]);
    updateUrlParams([]);
  };

  const handleZipChange = (value: string) => {
    setZip(value);
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
        <div className="flex flex-col-reverse items-center gap-4 border-b pb-4 sm:flex-row">
          <MatchButton dogs={favoriteDogs} disabled={!favoriteDogs.length} />
          <ViewFavoritesButton
            dogs={favoriteDogs}
            onReset={handleFavoriteReset}
            onRemoveFavorite={(v) => handleFavoriteChange(v)}
          />
        </div>
        <SearchControls
          onBreedChange={(v) => handleBreedsChange(v)}
          onOrderChange={(v) => handleOrderByChange(v)}
          onSortChange={(v) => handleSortByChange(v)}
          onZipChange={(v) => handleZipChange(v)}
          url={`/dogs?${zip ? `&zipCodes=${zip}` : ""}${filteredBreeds.length ? `&breeds=${filteredBreeds.join(",")}` : ""}${!!orderBy ? `&orderBy=${orderBy}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}${favoriteDogs ? `&favorites=${favoriteDogs.map((d) => d.id).join(",")}` : ""}`} // @TODO: clean up
          values={{
            breeds: filteredBreeds,
            orderBy: orderBy,
            sortBy: sortBy,
            zip: zip || null,
          }}
        />
        {!!dogs.length ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 2xl:grid-cols-5">
            {dogs &&
              dogs.map((dog, index) => (
                <DogCard
                  key={index}
                  dog={dog}
                  onFavorite={(dog) => handleFavoriteChange(dog)}
                  isFavorite={favoriteDogs.some((d) => d.id === dog.id)} // @TODO: abstract
                />
              ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-6 py-8">
            <Loader />
          </div>
          // <div className="py-6 text-center">No dogs founds</div> // @TODO: figure out a better way
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
