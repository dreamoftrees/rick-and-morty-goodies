import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import LoginForm from '@/components/login-form/LoginForm';
import Logo from '@/app/login/logo/Logo';

export default function LoginPage() {

  return (
    <Flex as="main" justifyContent="center">
      <VStack spacing={3} alignItems="center" width="350px" mt={6}>
        <Logo />
        <LoginForm />
      </VStack>
    </Flex>
  );
}
