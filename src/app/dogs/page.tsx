import DogSearch from "@/app/features/dogs/components/dog-search";
import { AboutButton, HelpButton, LoginButton } from "@/components/buttons";
import Logo from "@/components/logo";
import { SearchParams } from "@/lib/schemas";

export default async function DogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <div>
      <main className="grid md:gap-6 md:p-6">
        <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:gap-2 md:p-0 md:pb-0">
          <Logo />
          <div className="flex gap-2 sm:ml-auto">
            <LoginButton />
            <AboutButton />
            <HelpButton />
          </div>
        </div>
        <div className="bg-card p-4 pt-6 md:rounded-lg md:p-6">
          <DogSearch searchParams={params} />
        </div>
      </main>
    </div>
  );
}
