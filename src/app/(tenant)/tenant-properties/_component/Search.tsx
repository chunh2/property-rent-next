"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearch("");

    onSearch("");
  };

  const onSearch = (search: string) => {
    const query = new URLSearchParams(searchParams.toString());

    // set query 'search'
    if (search.trim()) {
      query.set("search", search);

      // reset to page 1
      query.set("page", "1");
    } else {
      query.delete("search");
    }

    router.push(`?${query.toString()}`);
  };

  return (
    <>
      <div className="flex">
        <div className="w-full relative">
          <Input
            value={search}
            onChange={handleChangeSearch}
            placeholder="Search by title"
            className="rounded-r-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(search);
              }
            }}
          />
          {search ? (
            <button
              type="button"
              className="absolute right-1 top-1 rounded-md hover:bg-neutral-100 p-1"
              onClick={clearSearch}
            >
              <X size={20} />
            </button>
          ) : null}
        </div>
        <Button onClick={() => onSearch(search)} className="rounded-l-none">
          <SearchIcon />
        </Button>
      </div>
    </>
  );
}

export default Search;
