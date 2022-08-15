import React, { useEffect, useState } from "react";

import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";

import { ProductItem } from "@components";
import { Product } from "@features";
import { theme } from "@styles";

interface ProductListProps {
  products: Product[];
  onCategoryClick: (category: string) => void;
}

const FlexContainer = styled("section")(
  ({ matches }: { matches: boolean }) => ({
    display: "grid",
    gridTemplateColumns: matches ? "1fr" : "1fr 1fr 1fr",
    gap: 16,
    height: "100%",
  })
);

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onCategoryClick,
}) => {
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <FlexContainer matches={matches}>
      {products.map((product, index) => (
        <ProductItem product={product} onCategoryClick={onCategoryClick} />
      ))}
    </FlexContainer>
  );
};
