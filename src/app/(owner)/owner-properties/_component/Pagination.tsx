"use client";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

function Pagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  const totalPages = Math.ceil(count / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const route = `/owner-properties`;

  const router = useRouter();

  const navigateToPage = (page: number) => {
    router.push(`${route}?page=${page}&limit=${limit}`);
  };

  return (
    <div className="flex justify-center my-5">
      <PaginationContent>
        {pages.map((value) => (
          <PaginationItem key={value}>
            <PaginationLink
              onClick={() => navigateToPage(value)}
              isActive={currentPage === value ? true : false}
              href="#"
            >
              {value}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </div>
  );
}

export default Pagination;
