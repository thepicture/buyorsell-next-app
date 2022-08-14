import Head from "next/head";
import Image from "next/image";

import styled from "@emotion/styled";

import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { useSingleProductQuery } from "@features";
import { theme } from "@styles";
import { useRouter } from "next/router";
import { NextPage } from "next";

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
  const { isLoading, error, data: product } = useSingleProductQuery(id);

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
            <div style={{ position: "relative" }}>
              <Image
                src={product.image}
                alt={product.title}
                priority
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
              <Button fullWidth variant="contained">
                Add to shopping cart
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} pr={2} pl={2}>
              <Button fullWidth variant="contained">
                Order
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} pr={2} pl={2}>
              <Button
                fullWidth
                onClick={() => router.push("/products")}
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
