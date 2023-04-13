import { API_URL } from "@/lib";
import { Local } from "@/types";
import Image from "next/image";

const getLocal = async (slug: string): Promise<Local> => {
  const response = await fetch(`${API_URL}/locals/find-by-slug/${slug}`);
  const data = await response.json();
  return data;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const local = await getLocal(params.slug);

  return (
    <div className="container mx-auto">
      <h1>{local.name}</h1>
      <p>{local.main_category.name}</p>
      <p>{local.description}</p>

      {local.images.map((gallery) => (
        <Image
          key={gallery.image.id}
          src={gallery.image.url}
          alt={gallery.image.alt_text}
          width={gallery.image.width}
          height={gallery.image.height}
        />
      ))}
    </div>
  );
}
