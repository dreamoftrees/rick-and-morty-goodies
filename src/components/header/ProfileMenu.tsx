"use client";

import { Avatar, Heading, Hide, HStack, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useSession } from '@/lib/session/SessionProvider';
import NextLink from 'next/link';

export default function ProfileMenu({ session }: { session: any }) {
  const { name, title } = useSession();

  return (
    <NextLink href={'/gallery/settings'}>
      {(name && title) ? (
        <HStack>
          <Hide below="sm">
            <VStack alignItems="end" gap="1">
              <Heading size="sm" color="white">{name}</Heading>
              <Text color="white">{title}</Text>
            </VStack>
          </Hide>
          <Avatar size="md" name={name!} src="https://rickandmortyapi.com/api/character/avatar/220.jpeg" />
        </HStack>) : (
        <HStack style={{opacity:0.6}}>
          <VStack alignItems="end" style={{ transform: 'scaleX(-1)' }}>
            <SkeletonText noOfLines={2} spacing="4" skeletonHeight="2" width="120px" />
          </VStack>
          <SkeletonCircle size="12" />
        </HStack>
      )}
    </NextLink>
  );
}
