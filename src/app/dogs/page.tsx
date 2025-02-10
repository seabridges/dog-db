import DogSearch from "@/app/features/dogs/components/dog-search";

export default function DogsRootPage() {
  return (
    <div>
      <main className="grid p-6 gap-6">
        <div>
          <h1 className="text-2xl">Dogs</h1>
        </div>
        <div>
          <DogSearch />
        </div>
      </main>
    </div>
  );
}
