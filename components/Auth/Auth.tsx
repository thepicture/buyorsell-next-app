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

import { signInWithEmailAndPassword } from "firebase/auth";

import { useProductImage } from "@features";
import { auth } from "@providers";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSkeletonEnabled, setIsSkeletonEnabled] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading, error, data } = useProductImage();

  const handleClick = async () => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(`You've signed in as ${credential.user.email}`);
    } catch (error) {
      alert("Incorrect email or password");
    }
  };

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
            <TextField
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              variant="standard"
            />
            <TextField
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              variant="standard"
            />
            <Button onClick={handleClick} variant="contained">
              Sign In
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
