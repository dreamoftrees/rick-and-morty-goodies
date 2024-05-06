import { SessionProvider } from '@/lib/session/SessionProvider';
import ThemeProvider from '@/lib/theme/ThemeProvider';
import { cookies } from 'next/headers';

export const Providers = ({ children }: { children: React.ReactNode }) => {

  // Support for Chakra color mode in SSR with cookies
  const cookieStore = cookies();
  const defaultTheme = 'dark';
  const uiColorMode = (cookieStore.get('chakra-ui-color-mode')?.value as 'light' | 'dark') || defaultTheme;

  // List of providers
  const providers: { component: React.ElementType, props: Record<string, unknown>}[] = [
    { component: ThemeProvider, props: { colorMode: uiColorMode } },
    { component: SessionProvider, props: {} },
  ];

  return (
    providers.reduceRight((kids, { component: Component, props }) => {
      return <Component {...props}>{kids}</Component>;
    }, children)
  );
};
