import { NextRequest, NextResponse } from "next/server";

type MiddlewareType = (
  req: NextRequest,
  next: () => Promise<NextResponse>
) => NextResponse | Promise<NextResponse>;

export default MiddlewareType;
