import React from "react";

import Image from "next/image";

import styled from "@emotion/styled";

import { Product } from "@features";
import { Card, Chip, Typography } from "@mui/material";

interface ProductListProps {
  products: Product[];
}

const FlexContainer = styled("section")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  columnGap: 16,
  height: "100%",
}));

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <FlexContainer>
      {products.map((product, index) => (
        <Card
          key={product.id}
          elevation={4}
          component="section"
          sx={{
            height: "400px",
            position: "relative",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            transition: "all 100ms ease-in-out",
            cursor: "pointer",
            marginBottom: products.length - index < 3 ? 0 : "16px",
          }}
        >
          <div style={{ position: "relative" }}>
            <Image
              src={product.image}
              alt={product.title}
              priority={index === 0}
              layout="fill"
              objectFit="contain"
            />
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: ".1",
                background: `linear-gradient(to bottom, transparent, black)`,
              }}
            ></div>
          </div>
          <div style={{ overflow: "hidden", padding: 16 }}>
            <Typography
              component="h2"
              fontWeight="bold"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              sx={{ overflow: "hidden" }}
              variant="h6"
            >
              {product.title}
            </Typography>
            <Typography component="p" fontWeight="bold">
              {product.price}$
            </Typography>
            <Chip label={product.category} color="primary" variant="outlined" />
            <Typography sx={{ overflow: "hidden" }}>
              {product.description}
            </Typography>
          </div>
        </Card>
      ))}
    </FlexContainer>
  );
};
