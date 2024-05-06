"use client";

import { Box, Heading, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@chakra-ui/skeleton';
import { useState } from 'react';

type GalleryItemProps = {
  item: {
    id: number;
    name: string;
    image: string;
  };
  loading: 'eager' | 'lazy' | undefined;
};

export function GalleryItem({ item, loading }: GalleryItemProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageLoadingStrategy, setImageLoadingStrategy] = useState(loading);
  const router = useRouter();

  const handleItemClick = () => {
    router.push(`/gallery/view/${item.id}`);
  };

  const handleImageError = () => {
    setImageLoading(false);

    // NOTE: Quick fix to reset the image loading strategy as fallback source is supported
    // This could be handled more gracefully with specific error state styles
    // Also worth considering error logging (Sentry, New Relic etc)
    setImageLoadingStrategy(undefined);
  };

  return (
    <Box onClick={handleItemClick} position="relative" borderRadius="lg" overflow="hidden">
      <Box position="absolute" bottom="0" width="100%" backgroundColor="rgba(0, 0, 0, 0.5)" zIndex={1} p={3}>
        <Heading size="md" color="white">{item.name}</Heading>
      </Box>
      <Skeleton isLoaded={!imageLoading}>
        <Image onLoad={() => setImageLoading(false)}
               onError={handleImageError}
               fallbackSrc="/logo-leonardo-ai.svg"
               alt={item.name}
               style={{ transform: "translate3d(0, 0, 0)" }}
               src={item.image}
               objectFit="cover"
               boxSize="300"
               width="100%"
               height={300}
               loading={imageLoadingStrategy}
               sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw" />
      </Skeleton>
    </Box>
  );
}
