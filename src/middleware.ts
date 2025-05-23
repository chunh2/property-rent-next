import authOwnerMiddleware from "./middleware/authOwnerMiddleware";
import authTenantMiddleware from "./middleware/authTenantMiddleware";
import composeMiddleware from "./middleware/composeMiddleware";

export const middleware = composeMiddleware([
  authOwnerMiddleware,
  authTenantMiddleware,
]);

export const config = {
  matcher: [
    "/owner-properties/:path*",
    "/owner-chats/:path*",
    "/tenant-properties/:path*",
    "/tenant-chats/:path*",
  ],
};
