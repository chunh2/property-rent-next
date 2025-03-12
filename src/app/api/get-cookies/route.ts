import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const cookiesInstance = cookies();

  const cookiesName = query.get("name");

  const value = cookiesInstance.get(cookiesName || "")?.value;

  return NextResponse.json({
    value,
  });
}
