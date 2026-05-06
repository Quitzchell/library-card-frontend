import Image from "next/image";
import Navigation from "@/app/_components/navigation/Navigation";

export default function Hero() {
  return (
    <section className="relative h-dvh">
      <div className="absolute inset-x-0 top-0 z-10 container flex justify-end py-8">
        <Navigation />
      </div>
      <div className="bg-primary flex h-9/10 items-center justify-center">
        <Image
          src="/images/library-card.jpg"
          width={1080}
          height={1080}
          className="size-50 md:size-100"
          priority={true}
          alt={"Snakes Illustration by Lot van Teylingen"}
        />
      </div>
      <div className="flex h-1/10 items-center bg-white">
        <h1 className="container text-end text-2xl text-black md:text-5xl">
          This is Library Card
        </h1>
      </div>
    </section>
  );
}
