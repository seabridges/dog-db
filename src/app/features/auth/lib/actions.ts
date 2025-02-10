import { User } from "@/app/features/auth/lib/schemas";
import { API_DEFAULT_HEADERS, API_METHODS, LOGIN_ENDPOINT } from "@/lib/config";
import { apiRequest } from "@/lib/utils";
import { redirect } from "next/navigation";

export const authUser = async (values: User) => {
  try {
    const response = await apiRequest(LOGIN_ENDPOINT, {
      method: API_METHODS.POST,
      headers: API_DEFAULT_HEADERS,
      body: JSON.stringify(values),
      credentials: "include",
    });
    console.log("response: ", response);
  } catch (error) {
    console.log("error: ", error);
  }

  // @TODO: temp
  redirect("/dogs");
};
