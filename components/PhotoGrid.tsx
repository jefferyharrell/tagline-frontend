import Image from "next/image";
import Link from "next/link";

type Photo = {
  id: string;
  filename: string;
  description?: string;
  thumbnail_url: string;
};

type Props = {
  photos: Photo[];
};

export default function PhotoGrid({ photos }: Props) {
  if (!photos?.length) {
    return <div className="text-gray-500">No photos found.</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <Link href={`/photos/${photo.id}`} key={photo.id}>
          <div className="bg-gray-100 rounded shadow hover:shadow-lg overflow-hidden">
            <Image
              src={photo.thumbnail_url}
              alt={photo.description || photo.filename}
              width={300}
              height={300}
              className="object-cover w-full h-48"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
