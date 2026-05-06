import { describe, expect, it } from "vitest";
import { sanitizePageParam } from "../page";

describe("sanitizePage", () => {
  // ─── Missing parameter ──────────────────────────────────────────────
  // When a search param isn't in the URL at all, it's undefined.
  // This is the most common case — first visit with no ?page= in URL.
  it("returns 1 for undefined", () => {
    expect(sanitizePageParam(undefined)).toBe(1);
  });

  // ─── Valid inputs ───────────────────────────────────────────────────
  // Normal usage: user clicks page 1 or page 3.
  it('returns 1 for "1"', () => {
    expect(sanitizePageParam("1")).toBe(1);
  });

  it('returns 3 for "3"', () => {
    expect(sanitizePageParam("3")).toBe(3);
  });

  // ─── Below minimum ─────────────────────────────────────────────────
  // Page 0 doesn't exist — clamp to 1.
  it('returns 1 for "0" (below minimum)', () => {
    expect(sanitizePageParam("0")).toBe(1);
  });

  // ─── Negative numbers ──────────────────────────────────────────────
  // Someone could manually type ?page=-5 in the URL.
  it('returns 1 for "-5" (negative number)', () => {
    expect(sanitizePageParam("-5")).toBe(1);
  });

  // ─── Fractional numbers ─────────────────────────────────────────────
  // Pages must be integers. Math.floor turns 1.7 into 1.
  it('returns 1 for "1.7" (fractional floors to integer)', () => {
    expect(sanitizePageParam("1.7")).toBe(1);
  });

  it('returns 3 for "3.9" (floors, does not round)', () => {
    expect(sanitizePageParam("3.9")).toBe(3);
  });

  // ─── Non-numeric strings ───────────────────────────────────────────
  // Someone could type garbage into the URL. Number("abc") is NaN,
  // NaN || 1 falls back to 1.
  it('returns 1 for "abc" (non-numeric string)', () => {
    expect(sanitizePageParam("abc")).toBe(1);
  });

  // ─── Empty string ──────────────────────────────────────────────────
  // Could happen if URL has ?page= with no value.
  // Number("") is 0, which is falsy, so || 1 kicks in.
  it('returns 1 for "" (empty string)', () => {
    expect(sanitizePageParam("")).toBe(1);
  });
});
