import { createClient } from '@supabase/supabase-js';

const bucket = 'gallery';

//TODO: create upload and delete image functions
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadPhoto = async (photo: File, category: string) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${photo.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(`${category}/${newName}`, photo, { cacheControl: '3600' });

  if (!data) throw new Error('Photo upload failed');

  //returning the public url after the image upload to the bucket so that we can save it in the database
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
