"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavBarLink from "./NavBarLink";
import Logout from "@/app/_utilsComponents/Logout";

function NavBar() {
  const navigations = [
    {
      title: "Property",
      href: "/owner-properties",
    },
    {
      title: "Chat",
      href: "/owner-chats",
    },
  ];

  return (
    <>
      <div className="flex justify-between m-8 sticky top-0">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {navigations.map((navigation) => (
                <NavBarLink key={navigation.href} {...navigation} />
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Logout />
      </div>
    </>
  );
}

export default NavBar;
