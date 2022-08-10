import React, { useState } from "react";

import Image from "next/image";

import {
  Button,
  Card,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useProductImage } from "@features";

export const Auth = () => {
  const [isSkeletonEnabled, setIsSkeletonEnabled] = useState(true);
  const { isLoading, error, data } = useProductImage();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card
      elevation={matches ? 0 : 8}
      sx={{ padding: 4, borderRadius: matches ? 0 : 6 }}
    >
      <Grid container>
        <Grid item md={6} sm={12} xs={12} position="relative">
          {!isLoading && !error && (
            <Image
              src={data}
              alt=""
              onLoadingComplete={() => setIsSkeletonEnabled(false)}
              layout="fill"
              priority
              objectFit="contain"
            />
          )}
          <Skeleton
            variant="rectangular"
            width={256}
            height="100%"
            sx={{ display: isSkeletonEnabled ? "block" : "none" }}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Stack>
            <Typography component="h2" variant="h5">
              Sign In
            </Typography>
            <TextField type="email" placeholder="Email" variant="standard" />
            <TextField
              type="password"
              placeholder="Password"
              variant="standard"
            />
            <Button variant="contained">Sign In</Button>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
