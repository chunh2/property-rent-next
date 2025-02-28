import { NextRequest, NextResponse } from "next/server";
import MiddlewareType from "./utils/MiddlewareType";

const composeMiddleware = (middlewares: MiddlewareType[]): MiddlewareType => {
  return async function (req: NextRequest): Promise<NextResponse> {
    let index = 0;

    async function next(): Promise<NextResponse> {
      if (index >= middlewares.length) {
        return NextResponse.next();
      }

      const middleware = middlewares[index];
      index++;
      return middleware(req, next);
    }

    return next();
  };
};

export default composeMiddleware;
