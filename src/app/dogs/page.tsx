import DogSearch from "@/app/features/dogs/components/dog-search";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Bone, Dog, HelpCircle, Info, PawPrint } from "lucide-react";
import Link from "next/link";

export default async function DogsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }; // @TODO: abstract
}) {
  const params = await searchParams;

  return (
    <div>
      <main className="grid gap-6 p-6">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <Logo />
          <div className="ml-auto flex gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  About
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <HelpCircle />
                  Help
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Help</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <DogSearch searchParams={params} />
      </main>
    </div>
  );
}
