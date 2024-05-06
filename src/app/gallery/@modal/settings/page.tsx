import React from 'react';
import GalleryModal from '@/app/gallery/@modal/GalleryModal';
import LoginForm from '@/components/login-form/LoginForm';
import { Divider, HStack, Text } from '@chakra-ui/react';
import LogoutForm from '@/app/gallery/@modal/settings/LogoutForm';

export default function GallerySettingsModal() {
  return (
    <GalleryModal title="Settings">
      <LoginForm submitLabel="Update" />
      <Divider orientation='horizontal' mb={5} />
      <LogoutForm />
    </GalleryModal>
  );
}
