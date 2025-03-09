import ImageGrid from "@/components/gallery/ImageGrid";
import LeftSectionTitle from "@/components/global/LeftSectionTitle";
import { fetchBridalPhotos } from "@/utils/actions";
import React from "react";

const BridalGallery = async () => {
  const bridalPhotos = await fetchBridalPhotos();

  return (
    <div className='relative py-20'>
      <LeftSectionTitle title='bridal photos' />
      <ImageGrid photos={bridalPhotos} />
    </div>
  );
};
export default BridalGallery;
