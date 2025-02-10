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
import { PawPrint } from "lucide-react";
import React from "react";

type SearchControlsProps = {
  onBreedChange: (values: string[]) => void;
};

const SearchControls: React.FC<SearchControlsProps> = ({ onBreedChange }) => {
  return (
    <>
      <div className="grid gap-2 border-b py-4">
        <div className="flex gap-4 items-center">
          <BreedSelect onSelect={(v) => onBreedChange(v)} />
          <Select>
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
          <Button>
            <PawPrint />
            Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchControls;
