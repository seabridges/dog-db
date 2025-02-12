"use client";

import {
  API_DEFAULT_HEADERS,
  API_METHODS,
  DOGS_BREEDS_ENDPOINT,
  DOGS_ENDPOINT,
  DOGS_SEARCH_ENDPOINT,
  LOCATIONS_ENDPOINT,
} from "@/lib/config";
import { OrderOptions, SortOptions } from "@/lib/schemas";
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
  zipCodes?: string[] | null;
  breeds?: string[];
  size: number;
  from: number;
  orderBy: OrderOptions;
  sortBy: SortOptions;
};

export const searchDogs = async (data: SearchDogsProps) => {
  const { breeds = [], size, from, orderBy, sortBy, zipCodes } = data;
  console.log("zipCodes: ", zipCodes);

  const queryParams = new URLSearchParams();

  if (zipCodes) {
    queryParams.append("zipCodes", zipCodes.join(","));
  }

  if (breeds && breeds.length > 0) {
    breeds.forEach((breed) => queryParams.append("breeds", breed));
  }

  if (from) {
    queryParams.append("from", from.toString());
  }

  if (size) {
    queryParams.append("size", size.toString());
  }

  queryParams.set("sort", `${orderBy}:${sortBy}`);

  const url = `${DOGS_SEARCH_ENDPOINT}${
    queryParams.toString() ? `?${queryParams}` : ""
  }`;

  try {
    const response = await apiRequest(url, {
      method: API_METHODS.GET,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
    });
    const data: SearchDogsResponse = JSON.parse(response);
    console.log("data: ", data);
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
    return JSON.parse(data);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getLocation = async (zip: string) => {
  try {
    const response = await apiRequest(LOCATIONS_ENDPOINT, {
      method: API_METHODS.POST,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
      body: JSON.stringify([zip]),
    });
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};
