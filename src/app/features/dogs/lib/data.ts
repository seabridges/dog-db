"use client";

import {
  API_DEFAULT_HEADERS,
  API_METHODS,
  DOGS_BREEDS_ENDPOINT,
  DOGS_ENDPOINT,
  DOGS_SEARCH_ENDPOINT,
} from "@/lib/config";
import { Dog } from "@/lib/schemas";
import { apiRequest } from "@/lib/utils";

export const getDogBreeds = async () => {
  try {
    const data = await apiRequest(DOGS_BREEDS_ENDPOINT, {
      method: API_METHODS.GET,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
    });
    return JSON.parse(data);
  } catch (error) {
    console.log("error: ", error);
  }
};

export type SearchDogsResponse = {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
};

type SearchDogsProps = {
  breeds?: string[];
  page?: number;
  size?: number;
  from?: number;
  orderBy?: "breed" | "name" | "age";
  sortBy?: "asc" | "desc";
};

export const searchDogs = async (data: SearchDogsProps) => {
  const { breeds = [], page = 1, size, from = 0, orderBy, sortBy } = data;

  const queryParams = new URLSearchParams();

  console.log("fetching...");
  console.log("breeds: ", breeds);
  console.log("page: ", page);
  console.log("size: ", size);
  console.log("from: ", from);
  console.log("orderBy: ", orderBy);
  console.log("sortBy: ", sortBy);

  if (breeds && breeds.length > 0) {
    queryParams.append("breeds", breeds.join(","));
  }

  if (from) {
    queryParams.append("from", from.toString());
  }

  if (size) {
    queryParams.append("size", size.toString());
  }

  const url = `${DOGS_SEARCH_ENDPOINT}${
    queryParams.toString() ? `?${queryParams}&sort=breed:asc` : ""
  }`;

  try {
    const response = await apiRequest(url, {
      method: API_METHODS.GET,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
    });
    const data: SearchDogsResponse = JSON.parse(response);
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getDogs = async (ids: string[]) => {
  try {
    const data = await apiRequest(DOGS_ENDPOINT, {
      method: API_METHODS.POST,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
      body: JSON.stringify(ids),
    });
    // console.log("data: ", JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.log("error: ", error);
  }
};
