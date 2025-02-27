"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PropertyStatusType } from "../utils/PropertyStatusType";

function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";

  //   check for invalid property_status_id
  const validateStatuses = Object.values(PropertyStatusType);

  const property_status_id = validateStatuses.includes(
    searchParams.get("property_status_id") as PropertyStatusType
  )
    ? searchParams.get("property_status_id")
    : "0";

  const [selectedStatus, setSelectedStatus] = useState(property_status_id);

  useEffect(() => {
    setSelectedStatus(property_status_id);
  }, [property_status_id]);

  const navigateToStatus = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Number(id) >= 1 && Number(id) <= 4) {
      params.set("property_status_id", id);
    } else {
      params.delete("property_status_id");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const statuses = [
    {
      id: "0",
      name: "All",
    },
    {
      id: "1",
      name: "Available",
    },
    {
      id: "2",
      name: "Pending",
    },
    {
      id: "3",
      name: "Rented",
    },
    {
      id: "4",
      name: "Unavailable",
    },
  ];

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
        {statuses.map((status) => (
          <ToggleGroupItem key={status.id} value={status.id}>
            {status.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default Filter;
