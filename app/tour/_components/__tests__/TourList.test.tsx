import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// ─── Mock Next.js modules ──────────────────────────────────────────
// next/image uses Next.js server internals for optimization. In tests,
// we replace it with a plain <img> tag since we only care about the
// src and alt attributes, not image optimization.
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

// next/link uses the Next.js router. In tests, we replace it with a
// plain <a> tag since we only care about the href and children.
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { TourDateEnum } from "@/lib/enums/tour-date";
import { TourDate, TourResponse } from "@/lib/interfaces/tour";
import TourList from "../TourList";

// ─── Test data factories ────────────────────────────────────────────
// Helper function to create test tour dates with sensible defaults.
// This keeps individual tests focused on what they're testing
// instead of repeating boilerplate data setup.
function makeTourDate(overrides: Partial<TourDate> = {}): TourDate {
  return {
    id: 1,
    date: new Date("2026-06-15T00:00:00"),
    venue: { id: 1, name: "Test Venue", city: "Test City", country: "NL" },
    ...overrides,
  };
}

function makeTourResponse(dates: TourDate[]): TourResponse {
  return { data: dates };
}

describe("TourList", () => {
  // ─── Basic content rendering ──────────────────────────────────────

  it("renders venue name, city, and country", () => {
    const tourDate = makeTourDate({
      venue: {
        id: 1,
        name: "Paradiso",
        city: "Amsterdam",
        country: "NL",
      },
    });

    render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.UPCOMING}
      />,
    );

    expect(screen.getByText("Paradiso")).toBeInTheDocument();
    expect(screen.getByText("Amsterdam, NL")).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    const tourDate = makeTourDate({
      date: new Date("2026-06-15T00:00:00"),
    });

    render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.UPCOMING}
      />,
    );

    // The TourList uses formatDate with custom options: { day: "2-digit", month: "long", year: "numeric" }
    // This produces something like "June 15, 2026"
    expect(screen.getByText(/June/)).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  // ─── TicketButtonContent: sold out state ──────────────────────────

  it('shows "Sold out" with strikethrough when sold_out is true', () => {
    const tourDate = makeTourDate({
      sold_out: true,
      ticket_url: "https://tickets.com",
    });

    render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.UPCOMING}
      />,
    );

    const soldOutText = screen.getByText("Sold out");
    expect(soldOutText).toBeInTheDocument();
    // The "Sold out" text has a line-through class applied
    expect(soldOutText).toHaveClass("line-through");
  });

  // ─── TicketButtonContent: has ticket URL ──────────────────────────

  it("renders a ticket link when ticket_url is present and not sold out", () => {
    const tourDate = makeTourDate({
      ticket_url: "https://ticketmaster.com/show123",
      sold_out: false,
    });

    render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.UPCOMING}
      />,
    );

    const ticketLink = screen.getByText("Tickets").closest("a");
    expect(ticketLink).toBeInTheDocument();
    expect(ticketLink).toHaveAttribute(
      "href",
      "https://ticketmaster.com/show123",
    );
  });

  // ─── TicketButtonContent: free event ──────────────────────────────

  it('shows "Free event" when no ticket_url and not sold out', () => {
    const tourDate = makeTourDate({
      // No ticket_url, no sold_out
    });

    render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.UPCOMING}
      />,
    );

    expect(screen.getByText("Free event")).toBeInTheDocument();
  });

  // ─── Past direction: no ticket buttons ────────────────────────────

  it("does not show ticket buttons for past shows", () => {
    const tourDate = makeTourDate({
      ticket_url: "https://tickets.com",
      sold_out: false,
    });

    render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.PAST}
      />,
    );

    // None of the ticket states should be visible for past shows
    expect(screen.queryByText("Tickets")).not.toBeInTheDocument();
    expect(screen.queryByText("Sold out")).not.toBeInTheDocument();
    expect(screen.queryByText("Free event")).not.toBeInTheDocument();
  });

  // ─── Empty slots ──────────────────────────────────────────────────

  it("renders the correct number of empty placeholder slots", () => {
    const tourDate = makeTourDate();

    const { container } = render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.UPCOMING}
        emptySlots={3}
      />,
    );

    // Empty slots are plain divs with a fixed height. We count them
    // by looking for elements with the empty-slot height class.
    const emptySlots = container.querySelectorAll(".h-26\\.5");
    expect(emptySlots).toHaveLength(3);
  });

  it("renders no empty slots when emptySlots is 0", () => {
    const tourDate = makeTourDate();

    const { container } = render(
      <TourList
        tourDates={makeTourResponse([tourDate])}
        direction={TourDateEnum.UPCOMING}
        emptySlots={0}
      />,
    );

    const emptySlots = container.querySelectorAll(".h-26\\.5");
    expect(emptySlots).toHaveLength(0);
  });
});
