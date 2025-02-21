import { GalleryPhoto } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const bucket = "gallery";

//TODO: create upload and delete image functions
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export const uploadPhoto = async (photo: File, category: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(`${category}/${photo.name}`, photo, { cacheControl: "3600" });

  if (error) throw new Error(error.message);

  //returning the public url after the image upload to the bucket so that we can save it in the database
  return supabase.storage.from(bucket).getPublicUrl(`${category}/${photo.name}`)
    .data.publicUrl;
};

export const deletePhotoFromBucket = (photo: GalleryPhoto) => {
  const imageName = photo.url.split("/").pop();

  if (imageName) {
    return supabase.storage
      .from(bucket)
      .remove([`${photo.category}/${imageName}`]);
  }

  throw new Error("Invalid URL");
};
