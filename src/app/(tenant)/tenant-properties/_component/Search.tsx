"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
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

  const onSearch = (search: string) => {
    const query = new URLSearchParams(searchParams.toString());

    // set query 'search'
    if (search.trim()) {
      query.set("search", search);
    } else {
      query.delete("search");
    }

    router.push(`?${query.toString()}`);
  };

  return (
    <>
      <div className="flex">
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
        <Button onClick={() => onSearch(search)} className="rounded-l-none">
          <SearchIcon />
        </Button>
      </div>
    </>
  );
}

export default Search;
