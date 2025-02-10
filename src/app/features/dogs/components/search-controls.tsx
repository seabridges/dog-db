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
import React from "react";

type SearchControlsProps = {};

const SearchControls: React.FC<SearchControlsProps> = ({}) => {
  return (
    <>
      <div className="grid gap-2 border-b py-4">
        <div className="flex gap-4 items-center">
          <BreedSelect />
          {/* <div>Zip code</div> */}
          {/* <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order</SelectLabel>
                <SelectItem value="asc">Breed</SelectItem>
                <SelectItem value="asc">Breed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
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
          <Button>Search</Button>
        </div>
      </div>
    </>
  );
};

export default SearchControls;
