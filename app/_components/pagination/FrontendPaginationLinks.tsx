"use client";

import { cn } from "@/utils/classnames";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { getPaginationRange } from "@/utils/page";

type FrontendPaginationLinksProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function FrontendPaginationLinks({
  totalPages,
  currentPage,
  onPageChange,
}: FrontendPaginationLinksProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!canGoPrev}
            className={cn(!canGoPrev && "pointer-events-none opacity-50")}
            onClick={() => canGoPrev && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {paginationRange.map((item, i) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => onPageChange(item)}
                className={cn(
                  "flex items-center justify-center",
                  item === currentPage &&
                    "pointer-events-none bg-neutral-300 opacity-50",
                )}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={!canGoNext}
            className={cn(!canGoNext && "pointer-events-none opacity-50")}
            onClick={() => canGoNext && onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
