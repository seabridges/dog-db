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

export const LoginButton: React.FC = () => {
  return (
    <Link href="/login">
      <Button
        variant="ghost"
        size="sm"
        // @TODO: maybe add something to detect if cookie has expired
      >
        Log In
      </Button>
    </Link>
  );
};

export const AboutButton: React.FC = () => {
  return (
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
            using TypeScript, React, NextJS, Tailwind CSS, Shadcn, & Zod with
            data from Fetch's Dog API.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const HelpButton: React.FC = () => {
  return (
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
          <p>
            Use the search to find dogs available to foster. You can filter by
            breed or zip code. Click the heart when you find a pup you love to
            add it to your favorites. Once you have selected your favorites,
            click the 'Find your match' button to be paired with your new best
            friend!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
