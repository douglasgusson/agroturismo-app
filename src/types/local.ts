export type Category = {
  id: number;
  name: string;
  slug: string;
}

export type Image = {
  id: number;
  url: string;
  width: number;
  height: number;
  alt_text: string;
  public_id: string;
};

export type ImageGallery = {
  local_id: number;
  image_id: number;
  arrangement: number;
  image: Image;
};

export type Local = {
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  description: string;
  main_category_id: number;
  id: number;
  main_category: Category;
  images: ImageGallery[];
};
