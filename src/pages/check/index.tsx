import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import styled from "@emotion/styled";

import { Button, Typography } from "@mui/material";

import { theme } from "@styles";
import { Product } from "@features";

const Container = styled("main")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: 16,
  [theme.breakpoints.down("md")]: {
    margin: 0,
    alignItems: "stretch",
    "& h2": {
      fontSize: 32,
    },
  },
}));

const CheckPage: NextPage = () => {
  const router = useRouter();

  const [cartCount, setCartCount] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    if (isCartEmpty) {
      return;
    }
    const handleStorageChange = () => {
      let cart = localStorage.getItem("cart");
      if (cart) {
        setCartCount((JSON.parse(cart) as Product[]).length);
        localStorage.removeItem("cart");
        setIsCartEmpty(true);
        window.dispatchEvent(new Event("storage"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isCartEmpty]);

  return (
    <>
      <Head>
        <title>Check</title>
        <meta name="description" content="Check for the ordered products" />
        <meta name="keywords" content="check,products,order,confirmed" />
      </Head>
      <Container>
        <Typography component="h2" variant="h2" mb={2} ml={2}>
          You successfully have ordered {cartCount} products
        </Typography>
        <Button
          onClick={() => router.replace("/products")}
          variant="contained"
          fullWidth
        >
          See more products
        </Button>
      </Container>
    </>
  );
};

export default CheckPage;
