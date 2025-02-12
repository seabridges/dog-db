import DogSearch from "@/app/features/dogs/components/dog-search";
import HeaderButtons from "@/components/header-buttons";
import Logo from "@/components/logo";

export default async function DogsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.searchParams;

  return (
    <div>
      <main className="grid md:gap-6 md:p-6">
        <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:gap-2 md:p-0 md:pb-0">
          <Logo />
          <HeaderButtons />
        </div>
        <div className="bg-card p-4 pt-6 dark:bg-zinc-900 md:rounded-lg md:p-6">
          <DogSearch
            searchParams={{
              breeds: params?.breeds as string,
              pageSize: params?.pageSize as string,
              page: params?.page as string,
              zipCode: params?.zip as string,
              orderBy: params?.orderBy as string,
              sortBy: params?.sortBy as string,
              favorites: params?.favorites as string,
            }}
          />
        </div>
      </main>
    </div>
  );
}
