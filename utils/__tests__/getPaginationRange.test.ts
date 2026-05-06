import { describe, expect, it } from "vitest";
import { getPaginationRange } from "../page";

describe("getPaginationRange", () => {
  // ─── Small page counts (≤ 5) ────────────────────────────────────────
  // When there are few pages, just show all of them. No ellipses needed.
  it("returns all pages when totalPages <= 5", () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(3, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(1, 3)).toEqual([1, 2, 3]);
  });

  // ─── Single page ────────────────────────────────────────────────────
  // Edge case: only one-page means only [1] in the range.
  it("returns [1] for a single page", () => {
    expect(getPaginationRange(1, 1)).toEqual([1]);
  });

  // ─── First page of many ─────────────────────────────────────────────
  // At page 1, there's no left ellipsis. The right side gets an ellipsis
  // because we can't show all pages between 2 and the last page.
  it("shows no left ellipsis when on the first page", () => {
    const range = getPaginationRange(1, 10);
    // Should be: [1, 2, "ellipsis", 10]
    expect(range[0]).toBe(1);
    expect(range).toContain(2);
    expect(range).toContain("ellipsis");
    expect(range[range.length - 1]).toBe(10);
    // No left ellipsis — "ellipsis" should only appear once (on the right)
    expect(range.filter((item) => item === "ellipsis")).toHaveLength(1);
  });

  // ─── Last page of many ──────────────────────────────────────────────
  // At the last page, there's no right ellipsis. The left side gets one.
  it("shows no right ellipsis when on the last page", () => {
    const range = getPaginationRange(10, 10);
    // Should be: [1, "ellipsis", 9, 10]
    expect(range[0]).toBe(1);
    expect(range).toContain(9);
    expect(range[range.length - 1]).toBe(10);
    expect(range).toContain("ellipsis");
    // No right ellipsis — "ellipsis" should only appear once (on the left)
    expect(range.filter((item) => item === "ellipsis")).toHaveLength(1);
  });

  // ─── Middle page ────────────────────────────────────────────────────
  // In the middle, BOTH sides get an ellipsis. We see the current page
  // and its immediate neighbors (siblings = 1).
  it("shows both ellipses when in the middle", () => {
    const range = getPaginationRange(5, 10);
    // Should be: [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(10);
    expect(range).toContain(4);
    expect(range).toContain(5);
    expect(range).toContain(6);
    // Both left and right ellipsis - "ellipsis" should appear twice
    expect(range.filter((item) => item === "ellipsis")).toHaveLength(2);
  });

  // ─── Near-start page ────────────────────────────────────────────────
  // Page 2 is close enough to page 1 that no left ellipsis is needed.
  it("omits left ellipsis when near the start (page 2)", () => {
    const range = getPaginationRange(2, 10);
    // Should be: [1, 2, 3, "ellipsis", 10]
    expect(range[0]).toBe(1);
    expect(range).toContain(2);
    expect(range).toContain(3);
    expect(range[range.length - 1]).toBe(10);
    // No left ellipsis — "ellipsis" should only appear once (on the right)
    expect(range.filter((item) => item === "ellipsis")).toHaveLength(1);
  });

  // ─── Near-end page ──────────────────────────────────────────────────
  // Page 9 is close enough to page 10 that no right ellipsis is needed.
  it("omits right ellipsis when near the end (page 9)", () => {
    const range = getPaginationRange(9, 10);
    // Should be: [1, "ellipsis", 8, 9, 10]
    expect(range[0]).toBe(1);
    expect(range).toContain(8);
    expect(range).toContain(9);
    expect(range[range.length - 1]).toBe(10);
    // No right ellipsis — "ellipsis" should only appear once (on the left)
    expect(range.filter((item) => item === "ellipsis")).toHaveLength(1);
  });

  // ─── Always includes first and last page ─────────────────────────────
  // No matter what currentPage is, page 1 and the last page are always shown.
  it("always includes the first and last page", () => {
    for (let current = 1; current <= 10; current++) {
      const range = getPaginationRange(current, 10);
      expect(range[0]).toBe(1);
      expect(range[range.length - 1]).toBe(10);
    }
  });
});
