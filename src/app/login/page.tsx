import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import LoginForm from '@/components/login-form/LoginForm';
import Logo from '@/components/logo/Logo';

export default function LoginPage() {

  return (
    <Flex as="main" justifyContent="center">
      <VStack spacing={3} alignItems="center" width="450px" mt={6}>
        <Logo />
        <Text fontWeight="bold" mb="1rem">
          Welcome to the Leonardo Ai web team challenge.
        </Text>

        <LoginForm />
      </VStack>
    </Flex>
  );
}
