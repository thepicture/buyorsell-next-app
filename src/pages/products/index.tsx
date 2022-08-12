import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import styled from "@emotion/styled";

import { Typography } from "@mui/material";

import { useCategoriesQuery, useProductsQuery } from "@features";
import { ProductList, ProductsFilter } from "@components";

const Container = styled("main")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  margin: 16,
}));

const IndexPage: NextPage = () => {
  const {
    isLoading: areProductsLoading,
    error: productsError,
    data: products,
  } = useProductsQuery();

  const {
    isLoading: areCategoriesLoading,
    error: categoriesError,
    data: categories,
  } = useCategoriesQuery();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const handleSortChange = (sort: string) => {
    setSort(sort);
  };
  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const filteredProducts = products
    ?.filter(
      (p) => category === "all" || category === "" || p.category === category
    )
    .sort((first, second) =>
      sort === "asc"
        ? first.title > second.title
          ? -1
          : 1
        : first.title > second.title
        ? 1
        : -1
    );

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="View products to order them" />
        <meta name="keywords" content="products,goods,order" />
      </Head>
      <Container>
        <ProductsFilter
          onSortChange={handleSortChange}
          categories={categories ?? []}
          onCategoryChange={handleCategoryChange}
        />
        {areProductsLoading || productsError ? (
          <Typography>Loading...</Typography>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </Container>
    </>
  );
};

export default IndexPage;
