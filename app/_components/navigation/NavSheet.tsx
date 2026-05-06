"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { homeItem, navItems } from "@/lib/enums/navigation";

import Link from "next/link";
import { cn } from "@/utils/classnames";
import { useState } from "react";
import { DialogTitle } from "@/app/_components/ui/dialog";

interface NavSheetProps {
  pathname: string;
}

export default function NavSheet({ pathname }: NavSheetProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        asChild
        className={cn(pathname.endsWith(homeItem.href) && "text-white")}
      >
        <Menu className="size-8 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="max-w-2/4">
        <SheetHeader>
          <DialogTitle className="text-lg font-normal">
            <Link href={homeItem.href} onClick={handleLinkClick}>
              Library Card
            </Link>
          </DialogTitle>
        </SheetHeader>
        <div className={cn("grid flex-1 auto-rows-min gap-4 px-4")}>
          {[homeItem, ...navItems].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "cursor-pointer text-lg font-medium transition-all duration-200",
                "hover:underline hover:underline-offset-4",
                pathname.endsWith(item.href) && "font-extrabold",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
