import { services } from "@/lib/services.config";
import ReleaseSectionClient from "@/app/music/_components/ReleaseSectionClient";

export default async function ReleaseSection() {
  let data;
  try {
    ({ data } = await services.music.getAllReleases());
  } catch {
    return null;
  }

  return <ReleaseSectionClient releases={data} />;
}
