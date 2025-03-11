"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavBarLink from "./NavBarLink";

function NavBar() {
  const navigations = [
    {
      title: "Property",
      href: "/owner-properties",
    },
    {
      title: "Chat",
      href: "/chats",
    },
  ];

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {navigations.map((navigation) => (
              <NavBarLink key={navigation.href} {...navigation} />
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

export default NavBar;
