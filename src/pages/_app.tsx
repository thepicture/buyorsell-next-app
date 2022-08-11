import { Provider } from "react-redux";

import type { AppProps } from "next/app";

import { ThemeProvider, useMediaQuery } from "@mui/material";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "@store";
import { style } from "@styles";
import { Footer, Header } from "@components";
import { theme } from "@styles";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {style}
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Header />
            <Component {...pageProps} />
            {!matches && <Footer />}
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
