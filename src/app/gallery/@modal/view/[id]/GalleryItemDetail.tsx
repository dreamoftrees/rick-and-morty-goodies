"use client";

import {
  Box,
  Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, ListItem, Modal, SkeletonText,
  Stack, Text, UnorderedList
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import apolloClient from '@/lib/client/apolloClient';
import { gql } from '@apollo/client';
import { Skeleton } from '@chakra-ui/skeleton';

type GalleryItemDetailProps = {
  id: number;
};

type ItemDetail = {
  name: string;
  image: string;
  status: string;
  species: string;
  origin: {
    name: string;
  }
  location: {
    name: string;
  }
  episode: {
    name: string;
  }[]
};

export default function GalleryItemDetail({ id }: GalleryItemDetailProps) {
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    // Fetch Item
    // TODO: Handle error states and update the UI accordingly
    apolloClient.query({
      query: gql`
        query {
          character(id: ${id}) {
            id
            name
            image
            status
            species
            origin {
              name
            }
            location {
              name
            }
            episode {
              id
              name
            }
          }
        }
      `,
    })
    .then((result) => {
      setLoaded(true);
      setItemDetail(result.data.character);
    });
  }, []);

  return (
    <Card maxW="md">
      {(loaded && itemDetail) && (
        <CardBody>
          <Image
            src={itemDetail.image}
            alt={itemDetail.name}
            borderRadius="lg"
            height="360px"
            width="100%"
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{itemDetail.name}</Heading>

            <Heading size='sm'>Status</Heading>
            <Text>{itemDetail.status}</Text>

            <Heading size='sm'>Species</Heading>
            <Text>{itemDetail.species}</Text>

            <Heading size='sm'>Origin</Heading>
            <Text>{itemDetail.origin?.name}</Text>

            <Heading size='sm'>Episodes</Heading>
            <UnorderedList>
              {itemDetail.episode?.map((episode: any) => (
                <ListItem key={episode.id}>{episode.name}</ListItem>
              ))}
            </UnorderedList>
          </Stack>
        </CardBody>
      )}
      {!loaded && (
        <CardBody>
          <Skeleton height="360px" width="100%" borderRadius="lg" />
          <SkeletonText mt='6' noOfLines={4} spacing='4' skeletonHeight='2' />
        </CardBody>
      )}
    </Card>
  );
}
