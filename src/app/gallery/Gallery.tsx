"use client";

import { GalleryItem } from '@/app/gallery/GalleryItem';
import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import apolloClient from '@/lib/client/apolloClient';
import { gql } from '@apollo/client';
import { Link } from '@chakra-ui/next-js';
import NextLink from 'next/link';
import { Skeleton } from '@chakra-ui/skeleton';
import { PageInfo } from '@/lib/client/types';
import GalleryNavigation from '@/app/gallery/GalleryNavigation';
import { useRouter } from 'next/navigation';

export default function Gallery({ page = '1' }: { page?: string }) {
  const router = useRouter();
  const [loaded, setLoaded ] = useState(false);
  const [galleryItems, setGalleryItems ] = useState([]);
  const [currentPage, setCurrentPage ] = useState(page);
  const [pageInfo, setPageInfo ] = useState<PageInfo>({
    count: 0,
    pages: 0,
    next: String(parseInt(page, 10) + 1),
    prev: String(parseInt(page, 10) - 1),
  });

  useEffect(() => {
    // Clear current gallery items
    setGalleryItems([]);
    setLoaded(false);

    // Fetch Images
    // TODO: Handle error states and update the UI accordingly
    apolloClient.query({
      query: gql`
        query {
          characters(page: ${currentPage}, filter: { name: "rick" }) {
            info {
              count,
              pages,
              next,
              prev
            }
            results {
              id,
              name,
              image
            }
          }
        }
      `,
    })
    .then((result) => {
      setLoaded(true);
      setPageInfo(result.data.characters.info);
      setGalleryItems(result.data.characters.results);
    });
  }, [currentPage]);

  // TODO: Potentially bubble up a page change event from navigation and operate only client side
  const handlePageChange = (page: string) => {

    // Client side render with shallow route and updating the URL without a server pass
    history.replaceState(null, '', `/gallery/${page}`);
    setCurrentPage(page);
  };

  return (
    <>
      {galleryItems.length > 0 && (
        <GalleryNavigation pageInfo={pageInfo} onChange={handlePageChange} />
      )}
      <SimpleGrid minChildWidth="300px" spacing="40px" width="100%">
        {galleryItems.map((item, index) => (
          <GalleryItem key={index} item={item} loading={index < 2 ? "eager" : "lazy"} />
        ))}
        {!loaded && galleryItems.length === 0 && (
          <>
            <Skeleton height="300px" width="100%" borderRadius="lg" opacity={0.2 + (0.2 * Math.random())} />
            <Skeleton height="300px" width="100%" borderRadius="lg" opacity={0.2 + (0.2 * Math.random())} />
            <Skeleton height="300px" width="100%" borderRadius="lg" opacity={0.2 + (0.2 * Math.random())} />
            <Skeleton height="300px" width="100%" borderRadius="lg" opacity={0.2 + (0.2 * Math.random())} />
            <Skeleton height="300px" width="100%" borderRadius="lg" opacity={0.2 + (0.2 * Math.random())} />
          </>
        )}
        {loaded && galleryItems.length === 0 && (
          <VStack>
            <Text textAlign="center">Empty as my fridge on a Monday — No items found</Text>
            <Link href="/gallery" as={NextLink}>Show me the goodies</Link>
          </VStack>
        )}
      </SimpleGrid>
    </>
  );
}
