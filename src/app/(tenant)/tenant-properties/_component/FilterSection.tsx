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
import PropertyTypeFilter from "./PropertyTypeFilter";
import { PropertyTypesType } from "@/app/_utils/getPropertyTypes";
import formatValueFromDb from "@/app/_utils/formatValueFromDb";
import MinPriceFilter from "./MinPriceFilter";
import MaxPriceFilter from "./MaxPriceFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type PropsType = {
  states: StateType[];
  propertyTypes: PropertyTypesType[];
};

function FilterSection({ states, propertyTypes }: PropsType) {
  const searchParams = useSearchParams();
  const router = useRouter();

  //   state START

  const [openState, setOpenState] = useState(false);

  const state_id_query = searchParams.get("state_id") || "";

  const state_query = states.find(
    (state: StateType) => parseInt(state_id_query) === state.id
  );

  const [selectedState, setSelectedState] = useState<undefined | StateType>(
    state_query || undefined
  );

  const handleSelectState = (state: StateType) => {
    setSelectedState(state);

    setOpenState(false);
  };

  const clearSelectedState = () => {
    setSelectedState(undefined);
  };

  //   State END

  // Property Type START

  const [openPropertyType, setOpenPropertyType] = useState(false);

  const property_type_id_query = searchParams.get("property_type_id") || "";

  const property_type_query = propertyTypes.find(
    (propertyType: PropertyTypesType) =>
      propertyType.id === parseInt(property_type_id_query)
  );

  const [selectedPropertyType, setSelectedPropertyType] = useState<
    undefined | PropertyTypesType
  >(property_type_query || undefined);

  const handleSelectedPropertyType = (propertyType: PropertyTypesType) => {
    setSelectedPropertyType(propertyType);

    setOpenPropertyType(false);
  };

  const clearSelectedPropertyType = () => {
    setSelectedPropertyType(undefined);
  };

  // Property Type END

  // Min Price START

  const min_price_query = searchParams.get("min_price") || "";

  const [minPrice, setMinPrice] = useState(min_price_query);

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const clearMinPrice = () => {
    setMinPrice("");
  };

  // Min Price END

  // Max Price START

  const max_price_query = searchParams.get("max_price") || "";

  const [maxPrice, setMaxPrice] = useState(max_price_query);

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
  };

  const clearMaxPrice = () => {
    setMaxPrice("");
  };

  // Max Price END

  const filters = [
    {
      key: "state_id",
      value: selectedState?.id.toString() || "",
    },
    {
      key: "property_type_id",
      value: selectedPropertyType?.id.toString() || "",
    },
    {
      key: "min_price",
      value: minPrice || "",
    },
    {
      key: "max_price",
      value: maxPrice || "",
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

  const clearFilter = () => {
    setSelectedState(undefined);
    setSelectedPropertyType(undefined);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="filter">
          <AccordionTrigger className="flex justify-center">
            <p className="mx-2">Filter</p>
          </AccordionTrigger>

          <AccordionContent>
            <Card className="py-5">
              <CardContent className="grid gap-5 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <StateFilter
                    states={states}
                    openState={openState}
                    setOpenState={setOpenState}
                    selectedState={selectedState}
                    handleSelectState={handleSelectState}
                    clearSelectedState={clearSelectedState}
                  />
                </div>

                <div className="sm:col-span-3">
                  <PropertyTypeFilter
                    propertyTypes={propertyTypes}
                    openPropertyType={openPropertyType}
                    setOpenPropertyType={setOpenPropertyType}
                    selectedPropertyType={selectedPropertyType}
                    handleSelectedPropertyType={handleSelectedPropertyType}
                    clearSelectedPropertyType={clearSelectedPropertyType}
                  />
                </div>

                <div className="sm:col-span-6 md:col-span-3">
                  <MinPriceFilter
                    minPrice={minPrice}
                    handleChangeMinPrice={handleChangeMinPrice}
                    clearMinPrice={clearMinPrice}
                  />
                </div>

                <div className="sm:col-span-6 md:col-span-3">
                  <MaxPriceFilter
                    maxPrice={maxPrice}
                    handleChangeMaxPrice={handleChangeMaxPrice}
                    clearMaxPrice={clearMaxPrice}
                  />
                </div>
              </CardContent>

              <div className="flex justify-end mb-2 mr-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilter}
                  className="mx-1"
                >
                  Clear
                </Button>
                <Button type="button" onClick={applyFilter}>
                  Apply
                </Button>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Render selected filter */}
      <div className="flex gap-1 my-1">
        {selectedState?.name ? (
          <div>
            <Badge>{selectedState?.name}</Badge>
          </div>
        ) : null}

        {selectedPropertyType?.name ? (
          <div>
            <Badge>{formatValueFromDb(selectedPropertyType?.name)}</Badge>
          </div>
        ) : null}

        {/* Min Price */}
        {min_price_query ? (
          <div>
            <Badge>From RM {min_price_query}</Badge>
          </div>
        ) : null}

        {/* Max Price */}
        {max_price_query ? (
          <div>
            <Badge>Up to RM {max_price_query}</Badge>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default FilterSection;
