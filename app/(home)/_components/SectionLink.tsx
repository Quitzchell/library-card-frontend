import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

type SectionLinkProps = {
  href: string;
  text: string;
};

export default function SectionLink({ href, text }: SectionLinkProps) {
  return (
    <Button variant={"ghost"}>
      <Link
        href={href}
        className="-my-2 p-2 underline hover:bg-black hover:text-white"
      >
        {text}
      </Link>
    </Button>
  );
}
