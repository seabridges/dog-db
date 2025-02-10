import BreedList from "@/app/features/dogs/components/breed-list";
import Image from "next/image";

export default function DogsRootPage() {
  return (
    <div>
      <main className="grid p-6 gap-6">
        <div>
          <h1 className="text-2xl">Dogs</h1>
        </div>
        <BreedList />
      </main>
    </div>
  );
}
