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

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useProductImage } from "@features";
import { auth } from "@providers";
import { FirebaseError } from "firebase/app";

export const AuthRegistration = () => {
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isSkeletonEnabled, setIsSkeletonEnabled] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading, error, data } = useProductImage();

  class PasswordError extends Error {}

  const handleClick = async () => {
    if (isRegistrationMode) {
      try {
        if (!email) {
          throw new PasswordError("Email is required");
        }

        if (!password || !repeatPassword) {
          throw new PasswordError("Password is required");
        }

        if (password !== repeatPassword) {
          throw new PasswordError("Passwords must match");
        }

        await createUserWithEmailAndPassword(auth, email, password);
        alert(`You've created your account`);
        setEmail("");
        setPassword("");
        setIsRegistrationMode((prev) => !prev);
      } catch (error) {
        if (error instanceof FirebaseError) {
          alert(error.message.split("Firebase: ")[1].split("(")[0]);
        } else if (error instanceof PasswordError) {
          alert(error.message);
        }
      }
    } else {
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
    }
  };

  return (
    <Card
      elevation={matches ? 0 : 8}
      sx={{ padding: 4, borderRadius: matches ? 0 : 6, width: "100%" }}
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
              {isRegistrationMode ? "Sign Up" : "Sign In"}
            </Typography>
            <TextField
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              variant="standard"
            />
            <TextField
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              variant="standard"
            />
            <TextField
              type="password"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              placeholder="Repeat password"
              variant="standard"
              sx={
                matches
                  ? isRegistrationMode
                    ? {}
                    : { display: "none" }
                  : { visibility: isRegistrationMode ? "visible" : "hidden" }
              }
            />
            <Button onClick={handleClick} variant="contained">
              {isRegistrationMode ? "Sign Up" : "SignIn"}
            </Button>
            <Button
              onClick={() => {
                setEmail("");
                setPassword("");
                setRepeatPassword("");
                return setIsRegistrationMode((prev) => !prev);
              }}
              variant="outlined"
            >
              {isRegistrationMode ? "I have an account" : "Create account"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
