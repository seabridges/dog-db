"use client";

import DogCard from "@/app/features/dogs/components/dog-card";
import { matchDog } from "@/app/features/dogs/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dog, Match } from "@/lib/schemas";
import { Heart, PawPrint, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const MatchButton: React.FC<
  { dogs: Dog[] } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ dogs, ...props }) => {
  const [dog, setDog] = useState<Dog | undefined>(undefined);

  useEffect(() => {
    if (dogs.length) {
      const getMatch = async () => {
        const match: Match = await matchDog(dogs.map((d) => d.id));
        if (match) {
          setDog(dogs.find((d) => d.id === match.match));
        }
      };

      getMatch();
    }
  }, [dogs]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto" {...props}>
          <PawPrint />
          Find your match!
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center sm:justify-start sm:text-left">
            <Heart fill="#fb7185" stroke="#fb7185" />
            You matched with {dog?.name}!
          </DialogTitle>
          <DialogDescription>
            One of our service represenatives will be reaching out shortly to
            coordinate further details.
          </DialogDescription>
        </DialogHeader>
        <div>{!!dog && <DogCard dog={dog} variant="match" />}</div>
      </DialogContent>
    </Dialog>
  );
};

export const ViewFavoritesButton: React.FC<
  {
    dogs: Dog[];
    onRemoveFavorite: (dog: Dog) => void;
    onReset: () => void;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ dogs, onRemoveFavorite, onReset }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Heart
            fill={!!dogs.length ? "#fb7185" : "rgba(0,0,0,0)"}
            stroke={!!dogs.length ? "#fb7185" : "#09090b"} // @TODO: abstract
          />
          Favorites {!!dogs.length && <>({dogs.length})</>}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Favorites</DialogTitle>
        </DialogHeader>
        {dogs?.length ? (
          <>
            <ul className="grid grid-cols-2 gap-2">
              {dogs.map((dog) => (
                <li key={`fav_dialog_${dog.id}`}>
                  <DogCard
                    dog={dog}
                    variant="mini"
                    onFavorite={(dog) => onRemoveFavorite(dog)}
                    isFavorite={dogs.some((d) => d === dog)}
                  />
                </li>
              ))}
            </ul>
            <Button variant="ghost" onClick={() => onReset()}>
              Reset
            </Button>
          </>
        ) : (
          <p>You have not favorited any dogs yet</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const SearchButton: React.FC<{ url: string }> = ({ url }) => {
  const Label = (
    <>
      <Search />
      Search
    </>
  );

  return (
    <Link href={url}>
      <Button variant="secondary" className="flex md:hidden">
        {Label}
      </Button>
      <Button className="hidden md:flex">{Label}</Button>
    </Link>
  );
};
