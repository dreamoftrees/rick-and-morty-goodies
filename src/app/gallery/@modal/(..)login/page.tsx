import React from 'react';
import GalleryModal from '@/app/gallery/@modal/GalleryModal';
import LoginForm from '@/components/login-form/LoginForm';

export default function GalleryLoginModal() {
  return (
    <GalleryModal title="Login" showClose={false}>
      <LoginForm submitLabel="Get Started" />
    </GalleryModal>
  );
}
