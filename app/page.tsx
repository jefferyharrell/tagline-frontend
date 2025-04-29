import PhotoGrid from "../components/PhotoGrid";
import { getPhotos } from "../lib/api";

export default async function GalleryPage() {
  // Fetch first page (MVP: no infinite scroll yet)
  let photos = [];
  let error = null;
  try {
    photos = await getPhotos();
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'message' in e) {
      error = (e as Error).message;
    } else {
      error = "Failed to load photos.";
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      {error && <div className="text-red-500">{error}</div>}
      <PhotoGrid photos={photos} />
    </main>
  );
}
