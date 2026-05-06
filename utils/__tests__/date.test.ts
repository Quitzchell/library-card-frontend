import { describe, expect, it } from "vitest";
import { formatDate } from "../date";

describe("formatDate", () => {
  // ─── Full format (default) ──────────────────────────────────────────
  // Default mode produces "Wed, Jan 1, 2025"-style output.
  // Used throughout the app when no specific format is requested.
  it("formats a Date object with the default full format", () => {
    const date = new Date("2025-01-01T00:00:00");
    const result = formatDate(date);

    // We check for key parts rather than an exact string because
    // locale output can vary slightly between environments.
    expect(result).toContain("Jan");
    expect(result).toContain("2025");
    expect(result).toContain("1");
  });

  // ─── Custom options override ────────────────────────────────────────
  // Custom options: { day: "2-digit", month: "long", year: "numeric" }
  // This produces something like "January 01, 2025" instead of the default.
  it("uses custom Intl.DateTimeFormatOptions when provided", () => {
    const date = new Date("2025-06-15T00:00:00");
    const result = formatDate(date, "full", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    expect(result).toContain("June");
    expect(result).toContain("15");
    expect(result).toContain("2025");
    // When custom options are provided, weekday should NOT appear
    // because the custom options don't include it.
    expect(result).not.toMatch(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/);
  });

  // ─── Partial formats ────────────────────────────────────────────────
  // The "partial" parameter lets callers request just one part of the date.
  // Each mode is tested independently to ensure they work in isolation.
  it('returns only the year when partial is "year"', () => {
    const result = formatDate(new Date("2025-03-15T00:00:00"), "year");
    expect(result).toBe("2025");
  });

  it('returns the full month name when partial is "month"', () => {
    const result = formatDate(new Date("2025-03-15T00:00:00"), "month");
    expect(result).toBe("March");
  });

  it('returns a 2-digit day when partial is "day"', () => {
    const result = formatDate(new Date("2025-03-05T00:00:00"), "day");
    expect(result).toBe("05");
  });

  // ─── String input ──────────────────────────────────────────────────
  // The function accepts both Date objects and date strings.
  // This is important because API responses often contain date strings.
  it("accepts a string input and converts it to a Date", () => {
    const result = formatDate("2025-06-15", "year");
    expect(result).toBe("2025");
  });

  // ─── Invalid date ──────────────────────────────────────────────────
  // When an invalid string is passed, new Date("not-a-date") creates an
  // "Invalid Date" object. toLocaleDateString returns "Invalid Date".
  // This test locks that behavior so we know what to expect.
  it("returns 'Invalid Date' for an unparseable date string", () => {
    const result = formatDate("not-a-date");
    expect(result).toBe("Invalid Date");
  });
});
