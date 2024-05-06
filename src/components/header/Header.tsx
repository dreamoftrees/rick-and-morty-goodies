import { Box, Flex } from '@chakra-ui/react';
import ProfileMenu from '@/components/header/ProfileMenu';
import Brand from '@/components/header/Brand';

type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <Flex as="header"
          px="5"
          py="4"
          width="100%"
          backgroundColor="rgba(0, 0, 0, 0.68)"
          backdropFilter="blur(5px)"
          position="fixed"
          zIndex="200"
          direction="row"
          minH="90px"
    >
      <Brand />
      <Box flexGrow="1">
        {children}
      </Box>

      <ProfileMenu />
    </Flex>
  );
}
