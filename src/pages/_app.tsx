import { Provider } from "react-redux";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "@store";
import { style } from "@styles";
import { Footer, Header } from "@components";
import { theme } from "@styles";
import styled from "@emotion/styled";
import Head from "next/head";

const queryClient = new QueryClient();

const Grid = styled("div")(() => ({
  height: "100vh",
  display: "grid",
  gridTemplateRows: "64px 1fr 64px",
}));

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {style}
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Grid>
              <Header />
              <Component {...pageProps} />
              {<Footer />}
            </Grid>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
