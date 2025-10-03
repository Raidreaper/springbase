import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Manifest = {
  albums: Record<string, { base: string; files: string[] }[]>;
};

const albumLabels: Record<string, string> = {
  "community-outreach": "Community Outreach",
  parade: "Independence Day Parade",
  assemblies: "Assemblies & Welcome",
  staff: "Staff & Leadership",
};

const GalleryPage = () => {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [active, setActive] = useState<string>("community-outreach");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const album = params.get("album");
    if (album) setActive(album);
  }, []);

  useEffect(() => {
    fetch("/images/manifest.json")
      .then((r) => r.json())
      .then((data: Manifest) => setManifest(data))
      .catch(() => setManifest({ albums: {} }));
  }, []);

  const albums = useMemo(() => Object.keys(manifest?.albums || {}), [manifest]);

  return (
    <PageLayout title="Gallery" subtitle="Photos from our vibrant community and events.">
      <div className="space-y-8">
        <Tabs value={active} onValueChange={setActive} className="w-full">
          <TabsList className="flex flex-wrap gap-2">
            {albums.map((a) => (
              <TabsTrigger key={a} value={a} className="capitalize">
                {albumLabels[a] || a.replace(/-/g, " ")}
              </TabsTrigger>
            ))}
          </TabsList>

          {albums.map((a) => (
            <TabsContent key={a} value={a} className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(manifest?.albums[a] || []).map((item, idx) => {
                  const src = item.files.find((f) => f.endsWith("-960.webp")) || item.files[0];
                  const full = item.files.find((f) => f.endsWith(".webp")) || src;
                  return (
                    <Card key={idx} className="card-elegant bg-card border-0 overflow-hidden">
                      <CardContent className="p-0">
                        <a href={`/images/${full}`} target="_blank" rel="noreferrer">
                          <img
                            src={`/images/${src}`}
                            alt="School activity photo"
                            className="w-full h-44 object-cover hover:opacity-95 transition"
                            loading="lazy"
                          />
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;


