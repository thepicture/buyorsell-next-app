import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import styled from "@emotion/styled";

import { Typography } from "@mui/material";

import { useCategoriesQuery, useProductsQuery } from "@features";
import { ProductList, ProductsFilter } from "@components";
import { theme } from "@styles";

const Container = styled("main")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  margin: 16,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
    rowGap: 16,
  },
}));

const ProductsPage: NextPage = () => {
  const {
    isLoading: areProductsLoading,
    error: productsError,
    data: products = [],
  } = useProductsQuery();

  const {
    isLoading: _areCategoriesLoading,
    error: _categoriesError,
    data: categories = [],
  } = useCategoriesQuery();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");

  const handleSortChange = (sort: string) => {
    setSort(sort);
  };
  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleSearchStringChange = (searchString: string) => {
    setTitle(searchString.trim().toLowerCase());
  };

  const filteredProducts = products
    ?.filter((product) => category === "all" || product.category === category)
    .filter((product) => !title || product.title.toLowerCase().includes(title))
    .sort((first, second) =>
      sort === "asc"
        ? first.title > second.title
          ? -1
          : 1
        : first.title > second.title
        ? 1
        : -1
    );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, sort, title]);

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
          categories={categories}
          category={category}
          onCategoryChange={handleCategoryChange}
          onSearchStringChange={handleSearchStringChange}
        />
        {areProductsLoading || productsError ? (
          <Typography>Loading...</Typography>
        ) : (
          <ProductList
            products={filteredProducts}
            onCategoryClick={handleCategoryChange}
          />
        )}
      </Container>
    </>
  );
};

export default ProductsPage;
