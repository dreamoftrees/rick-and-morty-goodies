import React from 'react';
import GalleryModal from '@/app/gallery/@modal/GalleryModal';
import LoginForm from '@/components/login-form/LoginForm';
import GalleryItemDetail from '@/app/gallery/@modal/view/[id]/GalleryItemDetail';

export default function GalleryItemDetailModal({ params: { id }}: { params: { id: number }}) {
  return (
    <GalleryModal>
      <GalleryItemDetail id={id} />
    </GalleryModal>
  );
}
