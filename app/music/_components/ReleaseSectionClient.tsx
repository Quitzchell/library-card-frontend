"use client";

import { useEffect, useState } from "react";
import { Release } from "@/lib/interfaces/music";
import { calculateEmptySlots } from "@/utils/page";
import ReleaseList from "@/app/music/_components/ReleaseList";
import FrontendPaginationLinks from "@/app/_components/pagination/FrontendPaginationLinks";

const MOBILE_PER_PAGE = 4;
const DESKTOP_PER_PAGE = 8;
// Keep in sync with Tailwind's `md` breakpoint.
const MD_BREAKPOINT = "(min-width: 768px)";

type ReleaseSectionClientProps = {
  releases: Release[];
};

export default function ReleaseSectionClient({
  releases,
}: ReleaseSectionClientProps) {
  const [mobilePage, setMobilePage] = useState(1);
  const [desktopPage, setDesktopPage] = useState(1);

  useEffect(() => {
    const mql = window.matchMedia(MD_BREAKPOINT);
    const onChange = () => {
      setMobilePage(1);
      setDesktopPage(1);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const mobileTotalPages = Math.ceil(releases.length / MOBILE_PER_PAGE);
  const mobileSlice = releases.slice(
    (mobilePage - 1) * MOBILE_PER_PAGE,
    mobilePage * MOBILE_PER_PAGE,
  );
  const mobileEmptySlots = calculateEmptySlots(
    mobileSlice.length,
    mobileTotalPages,
    MOBILE_PER_PAGE,
  );

  const desktopTotalPages = Math.ceil(releases.length / DESKTOP_PER_PAGE);
  const desktopSlice = releases.slice(
    (desktopPage - 1) * DESKTOP_PER_PAGE,
    desktopPage * DESKTOP_PER_PAGE,
  );
  const desktopEmptySlots = calculateEmptySlots(
    desktopSlice.length,
    desktopTotalPages,
    DESKTOP_PER_PAGE,
  );

  return (
    <>
      <section className="h-full content-center space-y-12 md:hidden">
        <div className="space-y-5">
          <section className="flex h-full flex-col items-center justify-center">
            <ReleaseList
              release={{ data: mobileSlice }}
              emptySlots={mobileEmptySlots}
            />
          </section>
          {mobileTotalPages > 1 && (
            <FrontendPaginationLinks
              totalPages={mobileTotalPages}
              currentPage={mobilePage}
              onPageChange={setMobilePage}
            />
          )}
        </div>
      </section>

      <section className="hidden h-full content-center space-y-12 md:block">
        <div className="space-y-5">
          <section className="flex h-full flex-col items-center justify-center">
            <ReleaseList
              release={{ data: desktopSlice }}
              emptySlots={desktopEmptySlots}
            />
          </section>
          {desktopTotalPages > 1 && (
            <FrontendPaginationLinks
              totalPages={desktopTotalPages}
              currentPage={desktopPage}
              onPageChange={setDesktopPage}
            />
          )}
        </div>
      </section>
    </>
  );
}
