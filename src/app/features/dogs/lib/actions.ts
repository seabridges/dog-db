import {
  API_DEFAULT_HEADERS,
  API_METHODS,
  DOGS_MATCH_ENDPOINT,
} from "@/lib/config";
import { apiRequest } from "@/lib/utils";

export const matchDog = async (ids: string[]) => {
  try {
    const response = await apiRequest(DOGS_MATCH_ENDPOINT, {
      method: API_METHODS.POST,
      headers: API_DEFAULT_HEADERS,
      credentials: "include",
      body: JSON.stringify(ids),
    });
    const data = JSON.parse(response);
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};
