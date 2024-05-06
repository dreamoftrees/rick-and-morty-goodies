"use client";

import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Brand() {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      src="/leonardo-logo-text.svg"
      width={100}
      alt="Leonardo AI"
    />
  );
}
