import { ChangeEvent, FormEvent, useContext, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import styled from "@emotion/styled";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { theme } from "@styles";
import { NotifyContext } from "@contexts";

const Container = styled("main")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: 16,
  [theme.breakpoints.down("md")]: {
    margin: 0,
    alignItems: "stretch",
    "& h2": {
      fontSize: 32,
    },
  },
}));

interface CardState {
  cardNumber: number;
  month: number;
  year: number;
  cvvOrCvn: number;
}

const PAYING_TIME_MILLISECONDS = 3200;

const OrderPage: NextPage = () => {
  const router = useRouter();

  const notify = useContext(NotifyContext);

  const [card, setCard] = useState<any>({});
  const [isPaying, setIsPaying] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = (event: FormEvent) => {
    event.preventDefault();

    if (Object.keys(card).some((key) => isNaN(parseInt(card[key])))) {
      notify("Check your input, you must type only digits");
    } else {
      setIsPaying(true);
      setTimeout(() => router.push("/check"), PAYING_TIME_MILLISECONDS);
    }
  };

  return (
    <>
      <Head>
        <title>Order</title>
        <meta
          name="description"
          content="Order products from the shopping cart"
        />
        <meta name="keywords" content="products,cart,order,confirmation" />
      </Head>
      <Container>
        {isPaying ? (
          <>
            <Typography
              component="h2"
              variant="h2"
              textAlign="center"
              mb={2}
              ml={2}
            >
              Don't leave the page, payment is in process...
            </Typography>
            <CircularProgress />
          </>
        ) : (
          <>
            <Typography component="h2" variant="h2" mb={2} ml={2}>
              Card for payment
            </Typography>
            <Card
              elevation={8}
              sx={{
                p: 2,
                pb: 2,
                pt: 0,
                [theme.breakpoints.down("md")]: {
                  p: 2,
                  pt: 0,
                  ml: 2,
                  mr: 2,
                },
              }}
            >
              <form onSubmit={handlePay}>
                <TextField
                  type="tel"
                  name="cardNumber"
                  onChange={handleChange}
                  autoComplete="cc-number"
                  inputMode="numeric"
                  required
                  placeholder="Card Number"
                  inputProps={{ maxLength: 16 }}
                  fullWidth
                  sx={{ mb: 0 }}
                />
                <Box display="flex" gap={2}>
                  <Box display="flex" gap={2}>
                    <TextField
                      type="tel"
                      name="month"
                      onChange={handleChange}
                      inputMode="numeric"
                      required
                      placeholder="MM"
                      inputProps={{ maxLength: 2 }}
                    />
                    <Typography alignSelf="center">/</Typography>
                    <TextField
                      type="tel"
                      name="year"
                      onChange={handleChange}
                      inputMode="numeric"
                      required
                      placeholder="YY"
                      inputProps={{ maxLength: 2 }}
                    />
                  </Box>
                  <TextField
                    type="tel"
                    name="cvvOrCvn"
                    onChange={handleChange}
                    inputMode="numeric"
                    required
                    placeholder="CVV / CVN"
                    inputProps={{ maxLength: 3 }}
                    fullWidth
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 0, mb: 0 }}
                >
                  Pay
                </Button>
              </form>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderPage;
