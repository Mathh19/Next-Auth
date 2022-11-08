import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

import '../../public/assets/fonts/styles.css';
import { GlobalStyles } from '../styles/global-styles';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <NextNProgress
          color={theme.colors.deepWhite}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
