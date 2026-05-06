"use client";

import { usePathname } from "next/navigation";
import NavSheet from "./NavSheet";

export default function Navigation() {
  const pathname = usePathname();

  return <NavSheet pathname={pathname} />;
}
