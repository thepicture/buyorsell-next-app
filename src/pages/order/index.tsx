import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

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
import { Product } from "@features";

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
  cardNumber: string;
  month: string;
  year: string;
  cvvOrCvn: string;
}

const PAYING_TIME_MILLISECONDS = 3200;
const SEARCH_VALUE = /\D/g;

const OrderPage: NextPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    setCart(
      localStorage.getItem("cart") === null
        ? []
        : (JSON.parse(localStorage.getItem("cart")!) as Product[])
    );
  }, []);

  const notify = useContext(NotifyContext);

  const [card, setCard] = useState<CardState>({
    cardNumber: "",
    month: "",
    year: "",
    cvvOrCvn: "",
  });
  const [isPaying, setIsPaying] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCard((prev: CardState) => ({
      ...prev,
      [name]: value.replaceAll(SEARCH_VALUE, ""),
    }));
  };

  const handlePay = (event: FormEvent) => {
    event.preventDefault();

    if (Object.keys(card).some((key) => isNaN(parseInt((card as any)[key])))) {
      notify("Check your input, you must type only digits");
    } else if (card.cardNumber.length !== 16) {
      notify("Card number must contain 16 digits");
    } else if (parseInt(card.month) > 12 || parseInt(card.month) < 1) {
      notify("Enter correct month");
    } else if (parseInt(20 + card.year) < new Date().getFullYear()) {
      notify("Year must be the current year or later");
    } else if (card.cvvOrCvn.length !== 3) {
      notify("CVV or CVN must be 3 digits long");
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
              Don&apos;t leave the page, payment is in process...
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
              <Typography mt={2}>
                {cart.map((product) => (
                  <Typography>
                    {product.title}: {(product.price / 100).toFixed(2)}$
                  </Typography>
                ))}
              </Typography>
              <Typography fontWeight="bold">
                TOTAL:{" "}
                {cart
                  .map((p) => p.price / 100)
                  .reduce((p1, p2) => p1 + p2, 0)
                  .toFixed(2)}
                $
              </Typography>
              <form onSubmit={handlePay}>
                <TextField
                  type="tel"
                  name="cardNumber"
                  onChange={handleChange}
                  value={card.cardNumber}
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
                      value={card["month"]}
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
                      value={card["year"]}
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
                    value={card["cvvOrCvn"]}
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
