import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import styled from "@emotion/styled";

import { Button, Typography } from "@mui/material";

import { Product } from "@features";
import { ProductList } from "@components";
import { theme } from "@styles";

const Container = styled("main")(() => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  margin: 16,
  rowGap: 16,
}));

const CartPage: NextPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    setCart(
      localStorage.getItem("cart") === null
        ? []
        : (JSON.parse(localStorage.getItem("cart")!) as Product[])
    );
  }, []);

  useEffect(() => {
    const handleCartChange = () => {
      setCart(
        localStorage.getItem("cart") === null
          ? []
          : (JSON.parse(localStorage.getItem("cart")!) as Product[])
      );
    };

    window.addEventListener("storage", handleCartChange);

    return () => {
      window.removeEventListener("storage", handleCartChange);
    };
  });

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="View products to order them" />
        <meta name="keywords" content="products,goods,order" />
      </Head>
      <Container>
        <Typography component="h2" variant="h2">
          Your cart contains{" "}
          {cart.length === 0 ? "nothing yet." : `${cart.length} products.`}
        </Typography>
        <Button
          onClick={() => router.push("/order")}
          variant="contained"
          sx={{
            justifySelf: "start",
            [theme.breakpoints.down("md")]: {
              justifySelf: "unset",
            },
          }}
        >
          Order all
        </Button>
        <ProductList products={cart} oneRow={true} />
      </Container>
    </>
  );
};

export default CartPage;
