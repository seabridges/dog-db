import BreedList from "@/app/features/dogs/components/breed-list";
import Image from "next/image";

export default function DogsRootPage() {
  return (
    <div>
      <main className="flex p-6">
        Dogs <BreedList />
      </main>
    </div>
  );
}
