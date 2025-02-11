import Loader from "@/components/loader";

export default function Loading() {
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center">
        <Loader visible={true} />
      </main>
    </>
  );
}
