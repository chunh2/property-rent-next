"use client";

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PropsType = {
  title: string;
  href: string;
};

function NavBarLink({ title, href }: PropsType) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  console.log(`${href}: ${isActive}`);

  return (
    <>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()} bg-opacity-60 ${
            isActive
              ? "border-b-2 border-blue-500 rounded-b-none bg-neutral-300 focus:bg-neutral-300"
              : ""
          }`}
        >
          {title}
        </NavigationMenuLink>
      </Link>
    </>
  );
}

export default NavBarLink;
