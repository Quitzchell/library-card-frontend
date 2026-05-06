import { services } from "@/lib/services.config";

export default async function Api() {
  const data = await services.music.getReleases();
  return (
    <main className="container">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
