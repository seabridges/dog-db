import Loader from "@/components/loader";

export default function Loading() {
  return (
    <>
      <main className="flex w-full items-center justify-center">
        <Loader visible={true} />
      </main>
    </>
  );
}
