"use client";

import { cn } from "@/utils/classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

type BackendPaginationLinksProps = {
  totalPages: number;
  currentPage: number;
  paramName: string;
};

export default function BackendPaginationLinks({
  totalPages,
  currentPage,
  paramName,
}: BackendPaginationLinksProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, String(page));
    return `${pathname}?${params.toString()}`;
  }

  function navigate(e: React.MouseEvent, page: number) {
    e.preventDefault();
    router.push(buildHref(page), { scroll: false });
  }

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!canGoPrev}
            className={cn(!canGoPrev && "pointer-events-none opacity-50")}
            {...(canGoPrev
              ? {
                  href: buildHref(currentPage - 1),
                  onClick: (e: React.MouseEvent) =>
                    navigate(e, currentPage - 1),
                }
              : {})}
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
                href={buildHref(item)}
                onClick={(e: React.MouseEvent) => navigate(e, item)}
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
            {...(canGoNext
              ? {
                  href: buildHref(currentPage + 1),
                  onClick: (e: React.MouseEvent) =>
                    navigate(e, currentPage + 1),
                }
              : {})}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
