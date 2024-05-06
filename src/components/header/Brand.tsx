import { Image } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Brand() {
  return (
    <NextLink href={'/'}>
      <Image
        src="/leonardo-logo-text.svg"
        width="160px"
        alt="Leonardo AI"
      />
    </NextLink>
  );
}
