import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Button, Card, Chip, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";

import { Product } from "@features";
import { theme } from "@styles";
import { useContext } from "react";
import { ShoppingCartContext } from "@contexts";

interface ProductListProps {
  products: Product[];
  onCategoryClick: (category: string) => void;
}

const FlexContainer = styled("section")(
  ({ matches }: { matches: boolean }) => ({
    display: "grid",
    gridTemplateColumns: matches ? "1fr" : "1fr 1fr 1fr",
    columnGap: 16,
    height: "100%",
  })
);

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onCategoryClick,
}) => {
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { add, remove } = useContext(ShoppingCartContext);

  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    setCart(
      localStorage.getItem("cart") === null
        ? []
        : (JSON.parse(localStorage.getItem("cart")!) as Product[])
    );
  }, []);

  return (
    <FlexContainer matches={matches}>
      {products.map((product, index) => {
        const isInCart = cart?.some((p) => p.id === product.id);
        return (
          <Card
            key={product.id}
            onClick={() => router.push(`/products/${product.id}`)}
            elevation={4}
            component="section"
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateRows: "1fr 1fr",
              transition: "all 100ms ease-in-out",
              cursor: "pointer",
              marginBottom: products.length - index < 3 ? 0 : "16px",
              "&:hover": {
                transform: "scale(1.01)",
              },
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
              <Chip
                clickable
                title={`Select ${product.category} as filter category`}
                onClick={(event) => {
                  event.stopPropagation();
                  onCategoryClick(product.category);
                }}
                label={product.category}
                color="primary"
                variant="outlined"
              />
              <Typography sx={{ height: "50px", overflow: "hidden" }}>
                {product.description}
              </Typography>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  if (isInCart) {
                    remove(product.id);
                    setCart((prev) => prev.filter((p) => p.id !== product.id));
                  } else {
                    add(product);
                    setCart((prev) => [...prev, product]);
                  }
                  window.dispatchEvent(new Event("storage"));
                }}
                fullWidth
                variant={isInCart ? "outlined" : "contained"}
                sx={{ mb: 0 }}
              >
                {isInCart ? "Remove from cart" : "Add to cart"}
              </Button>
            </div>
          </Card>
        );
      })}
    </FlexContainer>
  );
};
