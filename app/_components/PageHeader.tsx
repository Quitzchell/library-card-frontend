import Link from "next/link";
import Navigation from "@/app/_components/navigation/Navigation";
import { homeItem } from "@/lib/enums";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-8 flex justify-between">
      <div className="flex items-end space-x-1">
        <Link
          href={homeItem.href}
          className="hover:underline hover:underline-offset-4"
        >
          <h1 className="text-4xl font-bold">Library Card</h1>
        </Link>
        <p>/</p>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <Navigation />
    </div>
  );
}
