import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// NOTE: Detaching the color mode from the system color mode for this example
const config: ThemeConfig = {
  initialColorMode: 'dark', // 'dark' | 'light'
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

console.log('Theme created', theme);
export default theme;
