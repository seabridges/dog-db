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
import { HelpCircle } from "lucide-react";
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
        <div className="flex items-center gap-2">
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
                <div>
                  <p>
                    This application was built by{" "}
                    <Link
                      href="https://github.com/seabridges"
                      target="_blank"
                      className="font-semibold underline underline-offset-2"
                    >
                      Christian Bridges
                    </Link>{" "}
                    using TypeScript, React, NextJS, Tailwind CSS, Shadcn, & Zod
                    with data from Fetch's Dog API.
                  </p>
                </div>
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
                <div>
                  <p>@TODO</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="rounded-lg bg-card p-6">
          <DogSearch searchParams={params} />
        </div>
      </main>
    </div>
  );
}
