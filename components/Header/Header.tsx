import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import CartIcon from "@mui/icons-material/ShoppingCart";
import ShopIcon from "@mui/icons-material/Shop";
import MenuIcon from "@mui/icons-material/Menu";

import { signOut } from "firebase/auth";

import { NotifyContext } from "@contexts";
import { Product } from "@features";
import { auth } from "@providers";

export const Header = () => {
  const router = useRouter();
  const notify = useContext(NotifyContext);
  const [cartCount, setCartCount] = useState(0);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.replace("/");
      notify("You successfully have logged out!");
    } catch (error) {
      notify("Can't log out, try again");
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      let cart = localStorage.getItem("cart");
      if (cart) {
        setCartCount((JSON.parse(cart) as Product[]).length);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShopIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BuyOrSell
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {router.pathname !== "/" && (
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              )}
            </Menu>
          </Box>
          <ShopIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BuyOrSell
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {router.pathname !== "/" && (
              <>
                <CartIcon
                  onClick={() => router.push("/cart")}
                  cursor="pointer"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignSelf: "center",
                  }}
                />
                <Typography alignSelf="center" variant="caption" mr={2}>
                  {cartCount}
                </Typography>
                <Button onClick={handleLogOut} color="inherit">
                  Log out
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
