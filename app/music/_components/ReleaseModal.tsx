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
      <DialogContent className="flex flex-col md:max-w-2xl md:flex-row lg:max-w-4xl">
        <DialogHeader className="space-y-2 md:w-1/2 lg:w-3/8">
          <DialogTitle>{release.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Streaming links for {release.title}
          </DialogDescription>
          <div className="flex justify-center md:block md:size-75">
            <Image
              src={release.cover_image}
              width={500}
              height={500}
              alt={release.title}
            />
          </div>
        </DialogHeader>

        <div className="bg-foreground h-47 overflow-x-auto border md:mt-8.5 md:h-75">
          <div className="bg-background divide-y">
            {release.stores &&
              release.stores.map((store: Store, index) => (
                <ReleaseLinks key={index} link={store} />
              ))}
            {release.services &&
              release.services.map((service: Service, index) => (
                <ReleaseLinks key={index} link={service} />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
