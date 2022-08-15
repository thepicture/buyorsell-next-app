import { useRef, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import styled from "@emotion/styled";

// @ts-ignore
import FOG from "vanta/dist/vanta.fog.min";

import { AuthRegistration } from "@components";
import { useEffect } from "react";

const CenteredMain = styled("main")(
  ({ fullScreen }: { fullScreen: boolean }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: fullScreen ? "initial" : "center",
    alignItems: fullScreen ? "stretch" : "center",
  })
);

const AuthLayout = styled("div")(({ fullScreen }: { fullScreen: boolean }) => ({
  maxWidth: fullScreen ? "none" : "640px",
  width: fullScreen ? "100vw" : "640px",
  height: fullScreen ? "100%" : "inherit",
  display: fullScreen ? "flex" : "inherit",
  alignItems: fullScreen ? "center" : "inherit",
}));

const IndexPage: NextPage = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xf44336,
          midtoneColor: 0x3f44336,
          lowlightColor: 0xf44336,
          blurFactor: 0.5,
          speed: 0.0,
          zoom: 0.2,
        })
      );
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef}>
      <Head>
        <title>BuyOrSell Online Shop</title>
        <meta
          name="description"
          content="BuyOrSell is an e-commerce shop for buying or selling just anything one wants to"
        />
        <meta name="keywords" content="ecommerce,buy,sell" />
      </Head>
      <CenteredMain fullScreen={matches}>
        <AuthLayout fullScreen={matches}>
          <AuthRegistration />
        </AuthLayout>
      </CenteredMain>
    </div>
  );
};

export default IndexPage;
