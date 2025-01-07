import React from 'react';
import glamPhotos from '@/lib/glamPhotos.json';
import SectionTitle from '@/components/global/SectionTitle';
import ImageGrid from '@/components/gallery/ImageGrid';

const GlamGallery = () => {
  return (
    <div className='relative py-20'>
      <SectionTitle
        title='glam photos'
        alignment='right'
      />
      <ImageGrid photos={glamPhotos} />
    </div>
  );
};

export default GlamGallery;
