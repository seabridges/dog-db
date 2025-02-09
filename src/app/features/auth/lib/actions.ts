import { User } from "@/app/features/auth/lib/schemas";

export const authUser = async (values: User) => {
  console.log("values: ", values);
};
