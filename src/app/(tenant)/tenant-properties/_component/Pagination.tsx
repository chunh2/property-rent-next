"use client";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type PropsType = {
  count: number;
};

function Pagination({ count }: PropsType) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const totalPages = Math.ceil(count / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log(pages, count);

  const navigateToPage = (page: number) => {
    const query = new URLSearchParams(searchParams.toString());

    query.set("page", page.toString());

    router.push(`?${query.toString()}`);
  };

  console.log("current", currentPage);

  return (
    <div className="flex justify-center my-5">
      <PaginationContent>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => navigateToPage(page)}
              isActive={currentPage === page ? true : false}
              href="#"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </div>
  );
}

export default Pagination;
