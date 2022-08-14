import { useEffect } from "react";

import { Provider } from "react-redux";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { ThemeProvider } from "@mui/material";
import styled from "@emotion/styled";

import { getAuth } from "firebase/auth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "@store";
import { style } from "@styles";
import { Footer, Header } from "@components";
import { theme } from "@styles";
import { auth } from "@providers";
import { NotifyContext, ShoppingCartContext } from "@contexts";
import { useNotify } from "@hooks";
import { Product } from "@features";

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

const cartValue = {
  add: (product: Product) => {
    const cart = localStorage.getItem("cart");
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([product]));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...JSON.parse(localStorage.getItem("cart")!), product])
      );
    }
  },
  remove: (id: number) => {
    const cart = localStorage.getItem("cart")!;
    localStorage.setItem(
      "cart",
      JSON.stringify(
        (JSON.parse(cart) as Product[]).filter((product) => product.id !== id)
      )
    );
  },
};

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
            <ShoppingCartContext.Provider value={cartValue}>
              <NotifyContext.Provider value={notify}>
                <Grid isStickyHeader={router.pathname !== "/"}>
                  <NotifyBar />
                  <Header />
                  <Component {...pageProps} />
                  {<Footer />}
                </Grid>
              </NotifyContext.Provider>
            </ShoppingCartContext.Provider>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
