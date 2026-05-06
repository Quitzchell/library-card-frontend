import ReleaseLinks from "@/app/music/_components/StreamingService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Release, Service, Store } from "@/lib/interfaces/music";
import Image from "next/image";

export default function ReleaseModal({ release }: { release: Release }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full cursor-pointer space-y-2 border border-black p-4 hover:bg-black hover:text-white">
        <Image
          src={release.cover_image}
          width={1080}
          height={1080}
          alt={release.title}
        />
        <p className="h-18 w-full text-left text-balance underline group-hover:text-white">
          {release.title}
        </p>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] flex-col gap-y-0 overflow-hidden">
        <DialogHeader className="my-2 shrink-0 space-y-2 text-left">
          <DialogTitle>{release.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Streaming links for {release.title}
          </DialogDescription>
          <Image
            src={release.cover_image}
            width={1080}
            height={1080}
            alt={release.title}
          />
        </DialogHeader>

        <div className="-mx-6 min-h-0 overflow-y-auto px-6">
          {release.stores &&
            release.stores.map((store: Store, index) => (
              <ReleaseLinks key={index} link={store} />
            ))}
          {release.services &&
            release.services.map((service: Service, index) => (
              <ReleaseLinks key={index} link={service} />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
