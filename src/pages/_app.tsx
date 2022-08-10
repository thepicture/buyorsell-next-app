import { Provider } from "react-redux";

import type { AppProps } from "next/app";

import store from "../app/store";

import "../styles/globals.css";

import { Footer, Header } from "@components";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
