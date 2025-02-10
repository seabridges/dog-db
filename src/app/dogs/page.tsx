import DogSearch from "@/app/features/dogs/components/dog-search";
import { PawPrint } from "lucide-react";

export default function DogsRootPage() {
  return (
    <div>
      <main className="grid p-6 gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-xl flex gap-1 items-center font-bold">
            <PawPrint /> Paws
          </h1>
          <span className="text-muted-foreground text-xs italic mt-1">
            Find your new bestfriend
          </span>
        </div>
        <div>
          <DogSearch />
        </div>
      </main>
    </div>
  );
}
