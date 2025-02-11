import DogSearch from "@/app/features/dogs/components/dog-search";
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

export default function DogsRootPage() {
  return (
    <div>
      <main className="grid gap-6 p-6">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <h1 className="flex items-center gap-1 text-xl font-bold">
            <Dog /> FetchFinder
          </h1>
          <div className="ml-auto flex gap-2">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Bone />
                  About
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <DogSearch />
      </main>
    </div>
  );
}
