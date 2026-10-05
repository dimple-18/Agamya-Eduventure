import HomeGallery from "@/components/home/HomeGallery";
import { isOccasionLabel } from "@/lib/content/gallery-occasions";
import { getGalleryEvents } from "@/lib/content/queries";

export default async function HomeGallerySection() {
  const events = await getGalleryEvents();
  return <HomeGallery events={events.filter((event) => !isOccasionLabel(event.label))} />;
}
