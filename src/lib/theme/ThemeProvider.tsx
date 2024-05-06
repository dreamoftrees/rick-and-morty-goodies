"use client";

import {
  ChakraProvider,
  StyleFunctionProps,
  extendTheme,
  cookieStorageManager,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export default function ThemeProvider({
  children,
  colorMode,
    }: {
  children: React.ReactNode
  colorMode: 'light' | 'dark'
}) {
  const theme = extendTheme({
    config: {
      initialColorMode: colorMode,
      useSystemColorMode: true,
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          bg: mode('#fff', '#000')(props),
        },
      }),
    }
  });

  return (
    <ChakraProvider colorModeManager={cookieStorageManager} theme={theme}>
      {children}
    </ChakraProvider>
  )
}
