"use client";

import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useSession } from '@/lib/session/SessionProvider';
import { useRouter } from 'next/navigation';

export default function LogoutForm() {
  const { logout, login } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogoutClick = async () => {
    try {
      setLoading(true);
      await logout();
      router.push('/');
    } catch (error) {
      setLoading(false);
      console.error('Error logging out', error);
      // Handle error
    }
  };

  return (
    <Button onClick={handleLogoutClick}
            isLoading={loading}
            size="lg"
            width="100%"
            mb={5}
            variant="outline">Logout</Button>
  );
}
