"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dog } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Heart, Star } from "lucide-react";
import React, { useState } from "react";

type DogCardProps = {
  dog: Dog;
  onFavorite: (id: string) => void;
  favorite?: boolean;
};

const DogCard: React.FC<DogCardProps> = ({ dog, onFavorite, favorite }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite ?? false);

  const handleFavoriteClick = () => {
    console.log("favorite click");
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Card
        className={cn(
          "shadow-lg hover:border-foreground transition-colors overflow-hidden",
          isFavorite && "border-pink-300"
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
              <Button variant="link" onClick={handleFavoriteClick} size="icon">
                <span className="sr-only">Add to favorites</span>
                <Heart
                  fill={isFavorite ? "#fb7185" : "rgba(0,0,0,0)"}
                  stroke={isFavorite ? "#fb7185" : "#6b7280"}
                />
              </Button>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export default DogCard;
