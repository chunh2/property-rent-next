"use client";

import { StateType } from "@/app/_utils/getStates";
import StateFilter from "./StateFilter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type PropsType = {
  states: StateType[];
};

function FilterSection({ states }: PropsType) {
  const searchParams = useSearchParams();
  const router = useRouter();

  //   state START

  const [openState, setOpenState] = useState(false);

  const [selectedState, setSelectedState] = useState<undefined | StateType>(
    undefined
  );

  const handleSelectState = (state: StateType) => {
    setSelectedState(state);

    setOpenState(false);
  };

  const clearSelectedState = () => {
    setSelectedState(undefined);
  };

  //   State END

  const filters = [
    {
      key: "state_id",
      value: selectedState?.id.toString() || "",
    },
  ];

  const applyFilter = () => {
    const query = new URLSearchParams(searchParams.toString());

    // clear all fiters
    filters.map(({ key, value }) => {
      query.delete(key);
    });

    // add each to query param, if exist
    filters.map(({ key, value }) => {
      if (value) {
        query.set(key, value);
      }
    });

    // reset to page 1
    query.set("page", "1");

    router.push(`?${query.toString()}`);
  };

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>
          <p className="text-center">Filter</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <StateFilter
          states={states}
          openState={openState}
          setOpenState={setOpenState}
          selectedState={selectedState}
          handleSelectState={handleSelectState}
          clearSelectedState={clearSelectedState}
        />
      </CardContent>

      <CardFooter className="pb-3">
        {selectedState?.name ? (
          <div className="group">
            <Badge>
              {selectedState?.name}{" "}
              <X
                className="ml-1 cursor-pointer hidden group-hover:block"
                size={12}
                onClick={clearSelectedState}
              />
            </Badge>
          </div>
        ) : null}
      </CardFooter>

      <div className="flex justify-end mb-2 mr-2">
        <Button type="button" onClick={applyFilter}>
          Apply
        </Button>
      </div>
    </Card>
  );
}

export default FilterSection;
