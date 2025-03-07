"use server";

import { cookies } from "next/headers";

const deleteCookies = (cookiesName: string) => {
  cookies().delete(cookiesName);
};

export default deleteCookies;
