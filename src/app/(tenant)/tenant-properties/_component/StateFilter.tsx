"use client";

import { StateType } from "@/app/_utils/getStates";
import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";

type PropsType = {
  states: StateType[];
  openState: boolean;
  setOpenState: (openState: boolean) => void;
  selectedState: undefined | StateType;
  handleSelectState: (state: StateType) => void;
  clearSelectedState: () => void;
};

function StateFilter({
  states,
  openState,
  setOpenState,
  selectedState,
  handleSelectState,
  clearSelectedState,
}: PropsType) {
  return (
    <>
      <div>
        <Popover open={openState} onOpenChange={setOpenState}>
          <div className="flex">
            <PopoverTrigger asChild className="w-full md:w-auto">
              <Button variant="outline" type="button" role="combobox">
                Select State
              </Button>
            </PopoverTrigger>
            <Button
              variant="ghost"
              className={`${selectedState ? "block" : "hidden"}`}
              onClick={clearSelectedState}
            >
              <X />
            </Button>
          </div>

          <PopoverContent>
            <Command>
              <CommandInput placeholder="Enter state name" />

              <CommandList>
                <CommandEmpty>No state found</CommandEmpty>

                <CommandGroup>
                  {states?.map((state: StateType) => (
                    <CommandItem
                      key={state.id}
                      value={state.name}
                      onSelect={() => handleSelectState(state)}
                    >
                      {state.name}
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

export default StateFilter;
