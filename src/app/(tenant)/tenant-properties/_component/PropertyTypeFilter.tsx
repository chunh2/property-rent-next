"use client";

import formatValueFromDb from "@/app/_utils/formatValueFromDb";
import { PropertyTypesType } from "@/app/_utils/getPropertyTypes";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { X } from "lucide-react";

type PropsType = {
  propertyTypes: PropertyTypesType[] | null;
  openPropertyType: boolean;
  setOpenPropertyType: (openPropertyType: boolean) => void;
  selectedPropertyType: undefined | PropertyTypesType;
  handleSelectedPropertyType: (propertyType: PropertyTypesType) => void;
  clearSelectedPropertyType: () => void;
};

function PropertyTypeFilter({
  propertyTypes,
  openPropertyType,
  setOpenPropertyType,
  selectedPropertyType,
  handleSelectedPropertyType,
  clearSelectedPropertyType,
}: PropsType) {
  console.log(selectedPropertyType);
  return (
    <>
      <div>
        <Popover open={openPropertyType} onOpenChange={setOpenPropertyType}>
          <div className="flex">
            <PopoverTrigger asChild className="w-full md:w-auto">
              <Button variant="outline" type="button" role="combobox">
                Select Type
              </Button>
            </PopoverTrigger>

            <Button
              variant="ghost"
              className={selectedPropertyType ? "block" : "hidden"}
              onClick={clearSelectedPropertyType}
            >
              <X />
            </Button>
          </div>

          <PopoverContent>
            <Command>
              <CommandInput placeholder="Enter type of property" />

              <CommandList>
                <CommandEmpty>No type found</CommandEmpty>

                <CommandGroup>
                  {propertyTypes?.map((propertyType: PropertyTypesType) => (
                    <CommandItem
                      key={propertyType.id}
                      value={propertyType.name}
                      onSelect={() => handleSelectedPropertyType(propertyType)}
                    >
                      {formatValueFromDb(propertyType.name)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default PropertyTypeFilter;
