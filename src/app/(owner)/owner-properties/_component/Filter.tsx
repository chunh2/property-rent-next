"use client";

import { PropertyStatusesContext } from "@/app/_context/PropertyStatusesContext";
import formatValueFromDb from "@/app/_utils/formatValueFromDb";
import { PropertyStatusType } from "@/app/_utils/getPropertyStatuses";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type PropsType = {};

function Filter({}: PropsType) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const propertyStatuses: PropertyStatusType[] | null = useContext(
    PropertyStatusesContext
  );

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";

  const property_status_id = searchParams.get("property_status_id") || "0";

  const [selectedStatus, setSelectedStatus] = useState(property_status_id);

  useEffect(() => {
    setSelectedStatus(property_status_id);
  }, [property_status_id]);

  const navigateToStatus = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // set property_status_id
    if (Number(id) >= 1 && Number(id) <= 4) {
      params.set("property_status_id", id);
    } else {
      params.delete("property_status_id");
    }

    // reset page to 1, each time set property_status_id
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChangeStatus = (value: string) => {
    if (!value) return;

    setSelectedStatus(value);

    navigateToStatus(value);
  };

  return (
    <div className="flex justify-end my-5">
      <ToggleGroup
        type="single"
        value={selectedStatus || ""}
        onValueChange={handleChangeStatus}
      >
        <ToggleGroupItem value="0">All</ToggleGroupItem>
        {propertyStatuses?.map((status) => (
          <ToggleGroupItem key={status.id} value={status.id.toString()}>
            {formatValueFromDb(status.name)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default Filter;
