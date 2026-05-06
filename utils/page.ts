export function sanitizePageParam(value: string | undefined): number {
  return Math.max(1, Math.floor(Number(value) || 1));
}

export function calculateEmptySlots(
  count: number,
  totalPages: number,
  perPage: number,
): number {
  return totalPages > 1 ? Math.max(0, perPage - count) : 0;
}

export function getPaginationRange(currentPage: number, totalPages: number) {
  const siblings = 1;

  // Show all pages if total is small
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | "ellipsis")[] = [];

  // Always show first page
  range.push(1);

  // Calculate start and end of middle range
  const leftSibling = Math.max(2, currentPage - siblings);
  const rightSibling = Math.min(totalPages - 1, currentPage + siblings);

  // Add left ellipsis if needed
  if (leftSibling > 2) {
    range.push("ellipsis");
  }

  // Add middle pages
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) {
      range.push(i);
    }
  }

  // Add right ellipsis if needed
  if (rightSibling < totalPages - 1) {
    range.push("ellipsis");
  }

  // Always show last page
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}
