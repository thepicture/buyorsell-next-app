import { Provider } from "react-redux";

import type { AppProps } from "next/app";

import { createTheme, ThemeProvider } from "@mui/material";
import { red as primary } from "@mui/material/colors";

import store from "../app/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";

import { Footer, Header } from "@components";

const theme = createTheme({
  palette: {
    primary,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "1em 0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "1em 0",
        },
      },
    },
  },
});

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
