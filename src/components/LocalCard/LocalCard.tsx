import { Local } from "@/types";
import Image from "next/image";
import Link from "next/link";

export type LocalCardProps = {
  local: Local;
};

export const LocalCard: React.FC<LocalCardProps> = ({ local, ...props }) => {
  return (
    <Link key={local.id} href={`/local/${local.slug}`} className="group">
      <div className="aspect-1 w-full overflow-hidden rounded-md">
        <Image
          src={
            local.images.length > 0
              ? local.images[0].image.url
              : `https://api.lorem.space/image/house?w=400&h=400&hash=${Math.random()}`
          }
          alt={local.images[0]?.image.alt_text || local.name}
          width={local.images[0]?.image.width || 400}
          height={local.images[0]?.image.height || 400}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <h2>{local.name}</h2>
        <p>{/* {product.description} */}</p>
      </div>
      <p className="mt-1 italic text-gray-500">{local.main_category.name}</p>
    </Link>
  );
};
