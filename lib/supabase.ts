import { captureException } from "@sentry/nextjs";
import { createClient } from "@supabase/supabase-js";

const bucket = "portfolio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export const uploadPhoto = async (photo: File) => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(photo.name, photo, { cacheControl: "3600" });

  if (error) {
    captureException(error);
    return;
  }

  //returning the public url after the image upload to the bucket so that we can save it in the database
  return supabase.storage.from(bucket).getPublicUrl(photo.name).data.publicUrl;
};

export const deletePhotoFromBucket = (url: string) => {
  const imageName = url.split("/").pop();

  if (imageName) {
    return supabase.storage.from(bucket).remove([imageName]);
  }

  captureException("Error deleting photo from bucket: Invalid URL");
};
