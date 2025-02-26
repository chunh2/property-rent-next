import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function ProtectedOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login");
  }
  return (
    <>
      <>{children}</>
    </>
  );
}

export default ProtectedOwnerLayout;

const isAuthenticated = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return false;
  }

  const res = await fetch(`${API_URL}/api/auth/validate/owner`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.ok;
};
