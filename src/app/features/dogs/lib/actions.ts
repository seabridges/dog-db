"use client";

import {
  API_DEFAULT_HEADERS,
  API_METHODS,
  DOG_BREEDS_ENDPOINT,
} from "@/lib/config";
import { apiRequest } from "@/lib/utils";

export const getDogBreeds = async () => {
  try {
    const data = await apiRequest(DOG_BREEDS_ENDPOINT, {
      method: API_METHODS.GET,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
    });
    return JSON.parse(data);
  } catch (error) {
    console.log("error: ", error);
  }
};
