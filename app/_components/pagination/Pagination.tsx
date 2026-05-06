"use client";

import { cn } from "@/utils/classnames";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleNumber: (i: number) => void;
};

export default function PaginationContainer({
  totalPages,
  currentPage,
  handlePrev,
  handleNext,
  handleNumber,
}: PaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <>
      {totalPages !== 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!canGoPrev}
                className={cn(!canGoPrev && "pointer-events-none opacity-50")}
                onClick={() => canGoPrev && handlePrev()}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  className={cn(
                    "flex items-center justify-center",
                    i + 1 === currentPage &&
                      "pointer-events-none bg-neutral-300 opacity-50",
                  )}
                  onClick={() => handleNumber(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                aria-disabled={!canGoNext}
                className={!canGoNext ? "pointer-events-none opacity-50" : ""}
                onClick={() => canGoNext && handleNext()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
