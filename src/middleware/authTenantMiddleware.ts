import { NextRequest, NextResponse } from "next/server";
import MiddlewareType from "./utils/MiddlewareType";
import { cookies } from "next/headers";

const authTenantMiddleware: MiddlewareType = async (req: NextRequest, next) => {
  const { pathname } = req.nextUrl;

  const paths = ["/tenant-properties"];

  if (paths.some((path) => pathname.startsWith(path))) {
    console.log("Auth tenant");
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return next();
};

export default authTenantMiddleware;

const isAuthenticated = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return false;
  }

  const res = await fetch(`${API_URL}/api/auth/validate/tenant`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.ok;
};
