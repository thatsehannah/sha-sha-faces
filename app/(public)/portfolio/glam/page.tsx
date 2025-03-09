import React from "react";
import ImageGrid from "@/components/gallery/ImageGrid";
import { fetchGlamPhotos } from "@/utils/actions";
import RightSectionTitle from "@/components/global/RightSectionTitle";

const GlamGallery = async () => {
  const glamPhotos = await fetchGlamPhotos();

  return (
    <div className='relative py-20'>
      <RightSectionTitle title='glam photos' />
      <ImageGrid photos={glamPhotos} />
    </div>
  );
};

export default GlamGallery;
