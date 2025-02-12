"use client";

import { getLocation } from "@/app/features/dogs/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dog, Location } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Heart, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type DogCardProps = {
  dog: Dog;
  onFavorite?: (dog: Dog) => void;
  isFavorite?: boolean;
  variant?: "mini" | "match" | "default";
};

const DogCard: React.FC<DogCardProps> = ({
  dog,
  onFavorite,
  isFavorite = false,
  variant = "default",
}) => {
  const isMini = variant === "mini";
  const isMatch = variant === "match";

  const [location, setLocation] = useState<Location>();

  const getDogLocation = async (zip: string) => {
    const data = await getLocation(zip);
    if (data) {
      setLocation(data[0]);
    }
  };

  const handleFavoriteClick = () => {
    onFavorite && onFavorite(dog);
  };

  useEffect(() => {
    getDogLocation(dog.zip_code);
  }, [dog.zip_code]);

  return (
    <>
      {isMini ? (
        <Card className="flex items-center gap-2 overflow-hidden p-2">
          <div
            className="aspect-square h-10 w-10 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${dog.img})` }}
          />
          <div className="flex w-full items-center gap-4">
            <div>
              <div className="font-serif">{dog.name}</div>
              <div className="text-xs text-muted-foreground">{dog.breed}</div>
            </div>
            <div className="ml-auto">
              <Button
                variant="link"
                onClick={handleFavoriteClick}
                size="icon"
                // @TODO: abstract
              >
                <span className="sr-only">Remove from favorites</span>
                <Trash2 />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className={cn(
            !isMatch &&
              "overflow-hidden shadow-lg transition-colors hover:border-foreground",
            isMatch &&
              "flex flex-col items-center border-transparent bg-transparent shadow-none sm:flex-row",
          )}
        >
          <div
            className={cn(
              "aspect-square bg-cover bg-center",
              isMatch && "h-36 w-36 rounded-lg",
            )}
            style={{ backgroundImage: `url(${dog.img})` }}
          />
          <CardHeader className={cn("relative p-4", isMatch && "w-full")}>
            <CardTitle
              className={cn(
                "pr-10",
                isMatch && "pr-0 text-center sm:text-left",
              )}
            >
              <h3 className="font-serif text-xl sm:text-2xl">{dog.name}</h3>
              <span className="text-sm font-normal sm:text-lg">
                {dog.breed}
              </span>
            </CardTitle>
            <CardDescription>
              <div className="relative grid gap-2">
                <div
                  className={cn(
                    "flex flex-col md:flex-row md:flex-wrap",
                    isMatch && "flex-row",
                  )}
                >
                  <span>Age:&nbsp;</span>
                  <span className="text-nowrap">
                    {dog.age > 0 ? `${dog.age} years` : "Under 1 year"}
                  </span>
                </div>
                {location?.city && (
                  <div
                    className={cn(
                      "flex flex-col md:flex-row md:flex-wrap",
                      isMatch && "flex-row",
                    )}
                    title={location?.zip_code}
                  >
                    <span>Location:&nbsp;</span>
                    <span className="text-nowrap">
                      {location?.city}, {location?.state}
                    </span>
                  </div>
                )}
              </div>
              {!isMatch && (
                <div className="absolute right-2 top-2">
                  <Button
                    variant="link"
                    onClick={handleFavoriteClick}
                    size="icon"
                    // @TODO: abstract
                  >
                    <span className="sr-only">Add/Remove from favorites</span>
                    <Heart
                      fill={isFavorite ? "#fb7185" : "rgba(0,0,0,0)"}
                      stroke={isFavorite ? "#fb7185" : "#6b7280"} // @TODO: abstract
                    />
                  </Button>
                </div>
              )}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
  );
};

export default DogCard;
