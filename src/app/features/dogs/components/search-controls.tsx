import BreedSelect from "@/app/features/dogs/components/breed-select";
import { SearchButton } from "@/app/features/dogs/components/dog-buttons";
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
  const ZipField: React.FC = () => {
    return (
      <Input
        defaultValue={values.zip || undefined}
        onChange={(v) => onZipChange(v.target.value)}
        className="w-auto md:max-w-32"
        placeholder="Zip"
      />
    );
  };

  const OrderBySelect: React.FC = () => {
    return (
      <Select
        value={values.orderBy}
        onValueChange={(v: OrderOptions) => onOrderChange(v)}
      >
        <SelectTrigger className="w-[180px]">
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
    );
  };

  return (
    <>
      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
          <BreedSelect
            value={values.breeds}
            onSelect={(v) => onBreedChange(v)}
          />
          <ZipField />
          <OrderBySelect />
          <SortBySelect />
          <SearchButton url={url} />
        </div>
      </div>
    </>
  );
};

export default SearchControls;
