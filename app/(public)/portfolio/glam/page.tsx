import React from "react";
import ImageGrid from "@/components/portfolio/ImageGrid";
import { fetchGlamPhotos } from "@/utils/actions";
import { RightSectionTitle } from "@/components/global/SectionTitles";

const GlamPortfolio = async () => {
  const glamPhotos = await fetchGlamPhotos();

  return (
    <div className='relative py-20'>
      <RightSectionTitle title='glam photos' />
      <ImageGrid photos={glamPhotos} />
    </div>
  );
};

export default GlamPortfolio;
