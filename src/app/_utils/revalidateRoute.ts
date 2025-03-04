"use server";

import { revalidatePath } from "next/cache";

const revalidateRoute = (path: string) => {
  revalidatePath(path);
};

export default revalidateRoute;
