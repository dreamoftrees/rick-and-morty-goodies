"use client";

import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSession } from '@/lib/session/SessionProvider';
import { useRouter } from 'next/navigation';

export default function LogoutForm() {
  const { logout, login } = useSession();
  const router = useRouter();

  const handleLogoutClick = async () => {
    try {
      await login({name: '', title: ''});
      router.push('/');
    } catch (error) {
      console.error('Error logging out', error);
      // Handle error
    }
  };

  return (
    <Button size="lg" onClick={handleLogoutClick} width="100%" mb={5}>Logout</Button>
  );
}
