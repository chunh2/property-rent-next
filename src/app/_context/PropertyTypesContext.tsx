"use client";

import { createContext, useEffect, useState } from "react";
import getPropertyTypes, {
  PropertyTypesType,
} from "../_utils/getPropertyTypes";

export const PropertyTypesContext = createContext<null | PropertyTypesType[]>(
  null
);

function PropertyTypesProvider({ children }: { children: React.ReactNode }) {
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypesType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const propertyTypes: PropertyTypesType[] =
        (await getPropertyTypes()) || [];

      setPropertyTypes(propertyTypes);
    };

    fetchData();
  }, []);

  return (
    <PropertyTypesContext.Provider value={propertyTypes}>
      {children}
    </PropertyTypesContext.Provider>
  );
}

export default PropertyTypesProvider;
