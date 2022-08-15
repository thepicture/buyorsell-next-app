import { useContext, useEffect, useState } from "react";

import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import styled from "@emotion/styled";

import {
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { Product, useSingleProductQuery } from "@features";
import { theme } from "@styles";
import { ShoppingCartContext } from "@contexts";

const Container = styled("main")(() => ({
  padding: 16,
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    isLoading,
    error,
    data: product,
  } = useSingleProductQuery(parseInt(id as string));

  const { add, remove } = useContext(ShoppingCartContext);
  const [cart, setCart] = useState<Product[]>([]);

  const isInCart = cart?.some((p) => p.id === parseInt(id as string));

  useEffect(() => {
    setCart(
      localStorage.getItem("cart") === null
        ? []
        : (JSON.parse(localStorage.getItem("cart")!) as Product[])
    );
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          content="Detailed information about the product"
        />
        <meta name="keywords" content="details,order,product" />
      </Head>
      <Container>
        <Card
          component="main"
          elevation={8}
          sx={{
            width: "inherit",
            display: "grid",
            gridTemplateRows: "1fr 3fr",
            transition: "all 100ms ease-in-out",
          }}
        >
          {isLoading || error ? (
            <Skeleton variant="rectangular" height="100%" sx={{ margin: 2 }} />
          ) : (
            <div className="product__image-container">
              <Image
                src={product.image}
                alt={product.title}
                priority
                layout="fill"
                objectFit="contain"
              />
              <div className="product__image-gradient" />
              <style jsx>
                {`
                  .product__image-container {
                    position: relative;
                  }

                  .product__image-gradient {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0.1;
                    background: linear-gradient(to bottom, transparent, black);
                  }

                  .product__details {
                    overflow: hidden;
                    padding: 16px;
                  }
                `}
              </style>
            </div>
          )}

          {isLoading || error ? (
            <Stack>
              <Skeleton
                variant="rectangular"
                height="5%"
                sx={{ margin: "2em 1em 1em 1em" }}
              />
              <Skeleton
                variant="rectangular"
                height="5%"
                sx={{ margin: "0 1em 1em 1em" }}
              />
              <Skeleton
                variant="rectangular"
                height="5%"
                sx={{ margin: "0 1em 1em 1em" }}
              />
            </Stack>
          ) : (
            <Stack component="section" padding={2}>
              <Typography component="h2" variant="h4">
                {product.title}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />

              <Typography component="h3" variant="h4" mb={2}>
                Price
              </Typography>
              <Typography variant="h5">
                {Math.floor(product.price)} dollars{" "}
                {(product.price * 100) % 100} cents
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />

              <Typography component="h3" variant="h4" mb={2}>
                Categories
              </Typography>
              <Chip
                title={`Select ${product.category} as filter category`}
                label={product.category}
                color="primary"
                variant="outlined"
                sx={{ width: "fit-content" }}
              />
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component="h3" variant="h4" mb={2}>
                Description
              </Typography>
              <Typography variant="subtitle1">{product.description}</Typography>
            </Stack>
          )}
          <Grid container>
            <Grid item xs={12} sm={12} md={4} pr={2} pl={2}>
              {!isLoading && !error ? (
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    if (isInCart) {
                      remove(product.id);
                      setCart((prev) =>
                        prev.filter((p) => p.id !== product.id)
                      );
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
              ) : (
                <Skeleton
                  variant="rectangular"
                  height="50%"
                  sx={{ margin: "1em 0em 0em 0em" }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4} pr={2} pl={2}>
              <Button fullWidth variant="contained">
                Order
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} pr={2} pl={2}>
              <Button
                fullWidth
                onClick={() => router.back()}
                variant="outlined"
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default ProductPage;
