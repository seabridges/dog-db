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
import { CircleX, Heart } from "lucide-react";
import React from "react";

type DogCardProps = {
  dog: Dog;
  onFavorite?: (dog: Dog) => void;
  isFavorite?: boolean;
  variant?: "mini" | "default";
};

const DogCard: React.FC<DogCardProps> = ({
  dog,
  onFavorite,
  isFavorite = false,
  variant = "default",
}) => {
  const isMini = variant === "mini";

  const handleFavoriteClick = () => {
    onFavorite && onFavorite(dog);
  };

  return (
    <>
      {isMini ? (
        <Card className="flex overflow-hidden items-center p-2 gap-6">
          <div
            className="aspect-square bg-cover bg-center w-16 h-16"
            style={{ backgroundImage: `url(${dog.img})` }}
          />
          <div className="flex gap-4 items-center w-full">
            <div className="text-xl font-serif">{dog.name}</div>
            <div className="text-sm text-muted-foreground">{dog.breed}</div>
            <div className="ml-auto">
              <Button variant="link" onClick={handleFavoriteClick} size="icon"
               // @TODO: abstract
              >
                <span className="sr-only">Add/Remove from favorites</span>
                <Heart
                  fill={isFavorite ? "#fb7185" : "rgba(0,0,0,0)"}
                  stroke={isFavorite ? "#fb7185" : "#6b7280"}
                />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className={cn(
            "shadow-lg hover:border-foreground transition-colors overflow-hidden",
            isFavorite && "border-pink-300",
          )}
        >
          <div
            className="aspect-square bg-cover bg-center"
            style={{ backgroundImage: `url(${dog.img})` }}
          />
          <CardHeader className="p-4 relative pr-14">
            <CardTitle>
              <h3 className="text-2xl font-serif">{dog.name}</h3>
              <span className="text-lg font-normal">{dog.breed}</span>
            </CardTitle>
            <CardDescription>
              <div className="grid gap-2 relative">
                <div>
                  Age:&nbsp;
                  {dog.age > 0 ? `${dog.age} years` : "Under 1 year"}
                </div>
                <div>Zip:&nbsp;{dog.zip_code}</div>
              </div>
              <div className="absolute top-2 right-2">
                <Button
                  variant="link"
                  onClick={handleFavoriteClick}
                  size="icon"
                   // @TODO: abstract
                >
                  <span className="sr-only">Add/Remove from favorites</span>
                  <Heart
                    fill={isFavorite ? "#fb7185" : "rgba(0,0,0,0)"}
                    stroke={isFavorite ? "#fb7185" : "#6b7280"}
                  />
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
  );
};

export default DogCard;
