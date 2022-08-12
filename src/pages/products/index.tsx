import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

import { Typography } from "@mui/material";

import { useProductsQuery } from "@features";
import { ProductList, ProductsFilter } from "@components";

const Container = styled("main")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  margin: 16,
}));

const IndexPage: NextPage = () => {
  const { isLoading, error, data: products } = useProductsQuery();

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="View products to order them" />
        <meta name="keywords" content="products,goods,order" />
      </Head>
      <Container>
        <ProductsFilter />
        {isLoading || error ? (
          <Typography>Loading...</Typography>
        ) : (
          <ProductList products={products} />
        )}
      </Container>
    </>
  );
};

export default IndexPage;
