import HomeGallery from "@/components/home/HomeGallery";
import { getGalleryEvents } from "@/lib/content/queries";

export default async function HomeGallerySection() {
  const events = await getGalleryEvents();
  return <HomeGallery events={events} />;
}
