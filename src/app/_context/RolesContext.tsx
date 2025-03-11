"use client";

import { createContext, useEffect, useState } from "react";
import getRoles, { RoleType } from "../_utils/getRoles";

export const RolesContext = createContext<null | RoleType[]>(null);

function RolesProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<RoleType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roles: RoleType[] = (await getRoles()) || [];

      setRoles(roles);
    };

    fetchData();
  }, []);

  return (
    <RolesContext.Provider value={roles}>{children}</RolesContext.Provider>
  );
}

export default RolesProvider;
