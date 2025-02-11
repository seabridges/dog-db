import DogSearch from "@/app/features/dogs/components/dog-search";
import { Bone, Dog, PawPrint } from "lucide-react";

export default function DogsRootPage() {
  return (
    <div>
      <main className="grid gap-6 p-6">
        <div className="flex items-center gap-2">
          <h1 className="flex items-center gap-1 text-xl font-bold">
            <Dog /> FetchFinder
          </h1>
          {/* <span className="text-muted-foreground text-xs italic mt-1">
            Find your new bestfriend
          </span> */}
        </div>
        <div>
          <DogSearch />
        </div>
      </main>
    </div>
  );
}
