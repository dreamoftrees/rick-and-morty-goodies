import Header from '@/components/header/Header';
import { ReactNode } from 'react';
import {
  Box,
} from '@chakra-ui/react';

/**
 * Shared layout across the Gallery section for the header, could be used across all authenticated pages
 * via route grouping or a higher authenticated route ie. /authenticated/gallery
 * @param props
 * @constructor
 */
export default function GalleryLayout(props: {
  children: ReactNode;
  modal?: ReactNode;
}) {
  return (
    <>
      <Header/>
      {props.modal}
      <Box mt="110px">
        {props.children}
      </Box>
    </>
  );
}
