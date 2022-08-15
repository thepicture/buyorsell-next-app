import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import styled from "@emotion/styled";

import { Product } from "@features";
import { ProductList } from "@components";
import { Typography } from "@mui/material";

const Container = styled("main")(() => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  margin: 16,
  rowGap: 16,
}));

const CartPage: NextPage = () => {
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
        <ProductList products={cart} oneRow={true} />
      </Container>
    </>
  );
};

export default CartPage;
