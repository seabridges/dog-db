"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dog } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { CircleX, Heart, Trash2 } from "lucide-react";
import React from "react";

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

  const handleFavoriteClick = () => {
    onFavorite && onFavorite(dog);
  };

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
              "flex flex-row border-transparent bg-transparent shadow-none",
          )}
        >
          <div
            className={cn(
              "aspect-square bg-cover bg-center",
              isMatch && "h-36 w-36 rounded-lg",
            )}
            style={{ backgroundImage: `url(${dog.img})` }}
          />
          <CardHeader className="relative p-4 pr-14">
            <CardTitle>
              <h3 className="font-serif text-2xl">{dog.name}</h3>
              <span className="text-lg font-normal">{dog.breed}</span>
            </CardTitle>
            <CardDescription>
              <div className="relative grid gap-2">
                <div>
                  Age:&nbsp;
                  {dog.age > 0 ? `${dog.age} years` : "Under 1 year"}
                </div>
                <div>Location:&nbsp;{dog.zip_code}</div>
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
