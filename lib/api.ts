export async function getPhotos() {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/photos?offset=0&limit=50`,
    {
      credentials: "include",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY ?? "",
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }
  const data = await res.json();
  // Transform backend response to gallery format
  type Photo = {
    id: string;
    object_key: string;
    metadata?: { description?: string };
  };
  return (data.items || []).map((item: Photo) => ({
    id: item.id,
    filename: item.object_key,
    description: item.metadata?.description ?? "",
    thumbnail_url: `/api/photos/${item.id}/thumbnail`,
  }));
}
