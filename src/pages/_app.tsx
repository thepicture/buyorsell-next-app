import { useContext, useEffect } from "react";

import { Provider } from "react-redux";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { ThemeProvider } from "@mui/material";
import styled from "@emotion/styled";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "@store";
import { style } from "@styles";
import { Footer, Header } from "@components";
import { theme } from "@styles";
import { auth } from "@providers";
import { NotifyContext } from "@contexts";
import { useNotify } from "@hooks";
import { getAuth } from "firebase/auth";

const queryClient = new QueryClient();

const Grid = styled("div")(
  ({ isStickyHeader }: { isStickyHeader: boolean }) => ({
    height: isStickyHeader ? "100%" : "100vh",
    display: "grid",
    gridTemplateRows: "64px 1fr 64px",
    position: "relative",
    minHeight: "100vh",
  })
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { notify, NotifyBar } = useNotify();

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        if (router.pathname === "/") {
          router.replace("/products");
        }
      } else {
        if (router.pathname !== "/") {
          router.push("/");
        }
      }
    });
  }, [auth]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" />
      </Head>
      {style}
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <NotifyContext.Provider value={notify}>
              <Grid isStickyHeader={router.pathname !== "/"}>
                <NotifyBar />
                <Header />
                <Component {...pageProps} />
                {<Footer />}
              </Grid>
            </NotifyContext.Provider>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
