"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <>
      <div className="flex justify-center">
        <nav className="w-full h-auto mx-5 sm:w-4/5 sm:h-auto md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
          <div className="flex">
            <Button
              type="button"
              className="w-full rounded-b-none rounded-tr-none border border-r-0 border-b-0 border-neutral-200"
              variant={pathname === "/login" ? "default" : "ghost"}
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>

            <Button
              type="button"
              className="w-full rounded-b-none rounded-tl-none border border-l-0 border-b-0 border-neutral-200"
              variant={pathname === "/register" ? "default" : "ghost"}
              asChild
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
