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
import { Heart, PawPrint } from "lucide-react";
import { useEffect, useState } from "react";

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
        <Button {...props}>
          <PawPrint />
          Find your match!
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
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
