import { captureException } from "@sentry/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
);

export const uploadPhoto = async (photo: File, bucket: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(photo.name, photo, { cacheControl: "3600" });

  if (error && error instanceof Error) {
    captureException(error.message);

    throw new Error(
      error.message ? error.message : "An unknown error has occurred",
    );
  }

  //returning the public url after the image upload to the bucket so that we can save it in the database
  return supabase.storage.from(bucket).getPublicUrl(photo.name).data.publicUrl;
};

export const deletePhotoFromBucket = (url: string, bucket: string) => {
  const imageName = url.split("/").pop();

  if (imageName) {
    return supabase.storage.from(bucket).remove([imageName]);
  }

  captureException("Error deleting photo from bucket: Invalid URL");
};
