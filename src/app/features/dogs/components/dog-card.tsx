import { Card } from "@/components/ui/card";
import { Dog } from "@/lib/schemas";
import React from "react";

type DogCardProps = {
  dog: Dog;
};

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <>
      <Card>
        {dog.id}
        {dog.name}
      </Card>
    </>
  );
};

export default DogCard;
