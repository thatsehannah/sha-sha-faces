import ImageGrid from '@/components/gallery/ImageGrid';
import SectionTitle from '@/components/global/SectionTitle';
import bridalPhotos from '@/utils/bridalPhotos.json';
import React from 'react';

const BridalGallery = () => {
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
