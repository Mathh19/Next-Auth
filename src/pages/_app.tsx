import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../../public/assets/fonts/styles.css';
import { GlobalStyles } from '../styles/global-styles';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
