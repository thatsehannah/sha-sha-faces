import ImageGrid from "@/components/portfolio/ImageGrid";
import { LeftSectionTitle } from "@/components/global/SectionTitles";
import { fetchBridalPhotos } from "@/utils/actions";
import React from "react";

const BridalPortfolio = async () => {
  const bridalPhotos = await fetchBridalPhotos();

  return (
    <div className='relative py-20'>
      <LeftSectionTitle
        title='bridal photos'
        textClasses='dark:text-tertiary'
        barClasses='dark:bg-tertiary'
      />
      <ImageGrid photos={bridalPhotos} />
    </div>
  );
};
export default BridalPortfolio;
