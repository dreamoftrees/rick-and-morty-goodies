import { Flex, Heading } from '@chakra-ui/react';
import Gallery from '@/app/gallery/Gallery';

export default function GalleryPage({ params: { page }}: { params: { page: string }}) {
  return (
    <Flex as="main" px="5" width="100%" flexDirection="column" position="relative">
      <Heading mb="6">Gallery</Heading>
      <Gallery page={page} />
    </Flex>
  );
}
