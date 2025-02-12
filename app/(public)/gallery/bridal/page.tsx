import ImageGrid from '@/components/gallery/ImageGrid';
import SectionTitle from '@/components/global/SectionTitle';
import { fetchBridalPhotos } from '@/utils/actions';
import React from 'react';

const BridalGallery = async () => {
  const bridalPhotos = await fetchBridalPhotos();

  return (
    <div className='relative py-20'>
      <SectionTitle
        title='bridal photos'
        alignment='left'
      />
      <ImageGrid photos={bridalPhotos} />
    </div>
  );
};
export default BridalGallery;
