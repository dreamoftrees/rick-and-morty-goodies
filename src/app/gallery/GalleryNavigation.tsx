"use client";

import { HStack, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { PageInfo } from '@/lib/client/types';
import NextLink from 'next/link';

/**
 * Gallery Navigation Component.
 * Prefetch the next pages full page data.
 * TODO: Worth considering refactoring the paging to be lazy loaded based on scroll / or virtualized.
 * @param onChange
 * @param pageInfo
 * @constructor
 */
export default function GalleryNavigation({
  onChange,
  pageInfo,
}: {
  onChange?: (page: string) => void;
  pageInfo: PageInfo;
}) {

  return (
    <HStack gap={3} as="nav" position="absolute" top="0" right="20px">
      {pageInfo.prev && (
        <Tooltip label={`Previous`}>
          <NextLink href={`/gallery/${pageInfo.prev}`}>
            <IconButton
              colorScheme="blue"
              aria-label="Previous Page"
              size="lg"
              icon={<ChevronLeftIcon />}
            />
          </NextLink>
        </Tooltip>
      )}

      <Text>Page {(parseInt(pageInfo.prev, 10) || 0) + 1} of {pageInfo.pages}</Text>

      {pageInfo.next && (
        <Tooltip label={`Next`}>
          <NextLink href={`/gallery/${pageInfo.next}`} prefetch={true}>
            <IconButton
              colorScheme="blue"
              aria-label="Next Page"
              size="lg"
              icon={<ChevronRightIcon />}
            />
          </NextLink>
        </Tooltip>
      )}
    </HStack>
  );
}
