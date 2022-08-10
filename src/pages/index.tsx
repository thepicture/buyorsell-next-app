import type { NextPage } from "next";
import Head from "next/head";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Auth } from "@components";

const CenteredMain = styled("main")(
  ({ fullScreen }: { fullScreen: boolean }) => ({
    width: "100%",
    height: "90vh",
    display: "flex",
    justifyContent: fullScreen ? "initial" : "center",
    alignItems: "center",
  })
);

const AuthLayout = styled("div")(({ fullScreen }: { fullScreen: boolean }) => ({
  width: fullScreen ? "100%" : "640px",
}));

const IndexPage: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Head>
        <title>BuyOrSell Online Shop</title>
        <meta
          name="description"
          content="BuyOrSell is an e-commerce shop for buying or selling just anything one wants to"
        />
        <meta name="keywords" content="ecommerce,buy,sell" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenteredMain fullScreen={matches}>
        <AuthLayout fullScreen={matches}>
          <Auth />
        </AuthLayout>
      </CenteredMain>
    </>
  );
};

export default IndexPage;
