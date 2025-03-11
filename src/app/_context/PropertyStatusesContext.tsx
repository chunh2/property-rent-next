"use client";

import { createContext, useEffect, useState } from "react";
import getPropertyStatuses, {
  PropertyStatusType,
} from "../_utils/getPropertyStatuses";

export const PropertyStatusesContext = createContext<
  null | PropertyStatusType[]
>(null);

function PropertyStatusesProvider({ children }: { children: React.ReactNode }) {
  const [propertyStatuses, setPropertyStatuses] = useState<
    PropertyStatusType[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const propertyStatuses: PropertyStatusType[] =
        (await getPropertyStatuses()) || [];

      setPropertyStatuses(propertyStatuses);
    };

    fetchData();
  }, []);

  return (
    <PropertyStatusesContext.Provider value={propertyStatuses}>
      {children}
    </PropertyStatusesContext.Provider>
  );
}

export default PropertyStatusesProvider;
