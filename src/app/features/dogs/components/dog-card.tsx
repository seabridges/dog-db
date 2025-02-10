import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dog } from "@/lib/schemas";
import { Star } from "lucide-react";
import React from "react";

type DogCardProps = {
  dog: Dog;
};

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <>
      <Card className="relative shadow-lg">
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon">
            <Star />
          </Button>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="">
            <h3 className="text-2xl">{dog.name}</h3>
            <span className="text-lg font-normal italic">{dog.breed}</span>
          </CardTitle>
          <CardDescription>
            <div className="grid">
              <div>
                Age:&nbsp;
                {dog.age > 0 ? `${dog.age} years` : "Under 1 year"}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <img
            src={dog.img}
            alt={`${dog.name} - ${dog.breed}`}
            className="aspect-square w-full rounded-lg"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default DogCard;
