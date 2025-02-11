import BreedSelect from "@/app/features/dogs/components/breed-select";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOptions } from "@/lib/schemas";
import { PawPrint, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

type SearchControlsProps = {
  onBreedChange: (values: string[]) => void;
  onSortChange: (value: SortOptions) => void;
  url: string;
};

const SearchControls: React.FC<SearchControlsProps> = ({
  onBreedChange,
  onSortChange,
  url,
}) => {
  return (
    <>
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <BreedSelect onSelect={(v) => onBreedChange(v)} />
          <Select onValueChange={(v: SortOptions) => onSortChange(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Link href={url}>
            <Button>
              <Search />
              Search
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchControls;
