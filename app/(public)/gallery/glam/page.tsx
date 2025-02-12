import React from 'react';
import SectionTitle from '@/components/global/SectionTitle';
import ImageGrid from '@/components/gallery/ImageGrid';
import { fetchGlamPhotos } from '@/utils/actions';

const GlamGallery = async () => {
  const glamPhotos = await fetchGlamPhotos();

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
