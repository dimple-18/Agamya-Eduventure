import GalleryCatalog from "@/components/home/GalleryCatalog";
import { getGalleryEvents } from "@/lib/content/queries";

export default async function GalleryCatalogSection() {
  const events = await getGalleryEvents();
  return <GalleryCatalog events={events} />;
}
