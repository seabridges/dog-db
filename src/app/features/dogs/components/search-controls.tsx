import BreedSelect from "@/app/features/dogs/components/breed-select";
import { SearchButton } from "@/app/features/dogs/components/dog-buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderOptions, SortOptions } from "@/lib/schemas";
import { Filter } from "lucide-react";
import React from "react";

type SearchControlsProps = {
  onBreedChange: (values: string[]) => void;
  onOrderChange: (value: OrderOptions) => void;
  onSortChange: (value: SortOptions) => void;
  onZipChange: (value: string) => void;
  url: string;
  values: {
    breeds: string[];
    orderBy: OrderOptions;
    sortBy: SortOptions;
    zip: string | null;
  };
};

const SearchControls: React.FC<SearchControlsProps> = ({
  onBreedChange,
  onSortChange,
  onOrderChange,
  onZipChange,
  url,
  values,
}) => {
  const ZipField = (
    <Input
      defaultValue={values.zip || undefined}
      onChange={(v) => onZipChange(v.target.value)}
      className="w-full dark:bg-secondary sm:w-auto md:max-w-32"
      placeholder="Zip"
    />
  );

  const OrderBySelect: React.FC = () => {
    return (
      <Select
        value={values.orderBy}
        onValueChange={(v: OrderOptions) => onOrderChange(v)}
      >
        <SelectTrigger className="w-full dark:bg-secondary sm:w-[180px]">
          <SelectValue placeholder="Order by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order</SelectLabel>
            <SelectItem value="breed">Breed</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="age">Age</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  const SortBySelect: React.FC = () => {
    return (
      <Select
        value={values.sortBy}
        onValueChange={(v: SortOptions) => onSortChange(v)}
      >
        <SelectTrigger className="w-full dark:bg-secondary sm:w-[180px]">
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
    );
  };

  return (
    <>
      <div className="flex justify-start gap-6 pt-4 md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <Filter />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search Filters</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <BreedSelect
                  value={values.breeds}
                  onSelect={(v) => onBreedChange(v)}
                />
              </div>
              <div>{ZipField}</div>
              <div className="flex flex-wrap gap-4">
                <OrderBySelect />
                <SortBySelect />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="ml-auto">
          <SearchButton url={url} />
        </div>
      </div>
      <div className="hidden flex-wrap items-center gap-4 md:flex lg:flex-nowrap">
        <BreedSelect value={values.breeds} onSelect={(v) => onBreedChange(v)} />
        {ZipField}
        <OrderBySelect />
        <SortBySelect />
        <SearchButton url={url} />
      </div>
    </>
  );
};

export default SearchControls;
