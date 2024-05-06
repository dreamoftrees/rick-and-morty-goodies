"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function GalleryModal({ children, title = '', showClose = true }: {
  children: React.ReactNode,
  title?: string,
  showClose?: boolean,
}) {
  const router = useRouter();

  return (
    <Modal blockScrollOnMount={false} isOpen={true} onClose={() => router.back()}>
      <ModalOverlay backdropFilter='blur(3px) grayscale(0.5)' />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {(showClose && <ModalCloseButton />)}
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
