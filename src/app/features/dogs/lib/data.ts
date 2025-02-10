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

export const searchDogs = async () => {
  try {
    const data = await apiRequest(DOGS_SEARCH_ENDPOINT, {
      method: API_METHODS.GET,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
    });
    console.log("data: ", JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getDogs = async (ids: string[]) => {
  console.log("ids: ", ids);
  try {
    const data = await apiRequest(DOGS_ENDPOINT, {
      method: API_METHODS.POST,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
      body: JSON.stringify(ids),
    });
    console.log("data: ", JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.log("error: ", error);
  }
};
