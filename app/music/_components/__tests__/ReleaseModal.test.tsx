import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => <img src={src} alt={alt} {...props} />,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { Release } from "@/lib/interfaces/music";
import ReleaseModal from "../ReleaseModal";

// ─── Test data factories ────────────────────────────────────────────

function makeRelease(overrides: Partial<Release> = {}): Release {
  return {
    id: 1,
    title: "Test Album",
    cover_image: "/images/test-cover.jpg",
    services: [
      {
        label: "Spotify",
        url: "https://spotify.com/album/123",
      },
      {
        label: "Apple Music",
        url: "https://music.apple.com/album/123",
      },
    ],
    ...overrides,
  };
}

// Helper to open the dialog by clicking the trigger.
// We target the dialog trigger specifically using its data attribute
// rather than getByRole("button"), because the dialog's close button
// is also a button in the DOM.
async function openDialog() {
  const trigger = document.querySelector(
    '[data-slot="dialog-trigger"]',
  ) as HTMLElement;
  fireEvent.click(trigger);
  // Wait for the dialog portal to mount and content to appear
  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
}

describe("ReleaseModal", () => {
  // ─── Basic content rendering ──────────────────────────────────────

  it("renders release title and cover image in the trigger", () => {
    const release = makeRelease({ title: "Release One" });

    render(<ReleaseModal release={release} />);

    expect(screen.getByText("Release One")).toBeInTheDocument();
    expect(screen.getByAltText("Release One")).toBeInTheDocument();
  });

  it("renders title and cover image in the dialog content", async () => {
    const release = makeRelease({ title: "Release Two" });

    render(<ReleaseModal release={release} />);
    await openDialog();

    // Title appears in both trigger and dialog header
    const titles = screen.getAllByText("Release Two");
    expect(titles.length).toBeGreaterThanOrEqual(2);

    // Cover image appears in both trigger and dialog
    const images = screen.getAllByAltText("Release Two");
    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  // ─── Stores render before repository ────────────────────────────────
  // The code renders stores first, then repository. This is intentional:
  // stores (where to BUY) are higher priority than streaming repository.

  it("renders stores before repository in the dialog", async () => {
    const release = makeRelease({
      stores: [
        {
          name: "Example Store",
          url: "https://example.com/store/product",
          postfix: "Buy now!",
        },
      ],
      services: [
        {
          label: "Spotify",
          url: "https://spotify.com/album/123",
        },
      ],
    });

    render(<ReleaseModal release={release} />);
    await openDialog();

    const dialog = screen.getByRole("dialog");
    const links = dialog.querySelectorAll("a");

    // First link should be the store, second should be the service.
    // This verifies the rendering order in the actual DOM.
    expect(links[0]).toHaveTextContent("Example Store");
    expect(links[1]).toHaveTextContent("Spotify");
  });

  // ─── Optional arrays ──────────────────────────────────────────────
  // Releases may have only repository, only stores, or both.

  it("renders only repository when stores are undefined", async () => {
    const release = makeRelease({
      services: [
        {
          label: "Spotify",
          url: "https://spotify.com/album/123",
        },
      ],
      stores: undefined,
    });

    render(<ReleaseModal release={release} />);
    await openDialog();

    expect(screen.getByText("Spotify")).toBeInTheDocument();
  });

  it("renders only stores when repository are undefined", async () => {
    const release = makeRelease({
      services: undefined,
      stores: [
        {
          name: "Bandcamp Store",
          url: "https://bandcamp.com/merch",
        },
      ],
    });

    render(<ReleaseModal release={release} />);
    await openDialog();

    expect(screen.getByText("Bandcamp Store")).toBeInTheDocument();
  });

  // ─── External links ───────────────────────────────────────────────
  // All streaming/store links should open in a new tab (target="_blank").

  it("opens streaming service links in a new tab", async () => {
    const release = makeRelease({
      services: [
        {
          label: "Bandcamp",
          url: "https://bandcamp.com/track/123",
        },
      ],
    });

    render(<ReleaseModal release={release} />);
    await openDialog();

    const link = screen.getByText("Bandcamp").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("href", "https://bandcamp.com/track/123");
  });

  // ─── Postfix display ──────────────────────────────────────────────
  // Some links have a postfix (e.g., "Buy now!") that appears after the name.

  it("renders the postfix text for store links", async () => {
    const release = makeRelease({
      stores: [
        {
          name: "Example Store",
          url: "https://example.com/store/product",
          postfix: "Buy now!",
        },
      ],
    });

    render(<ReleaseModal release={release} />);
    await openDialog();

    expect(screen.getByText("Example Store")).toBeInTheDocument();
    expect(screen.getByText("Buy now!")).toBeInTheDocument();
  });
});
