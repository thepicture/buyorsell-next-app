import React from "react";

import { Typography } from "@mui/material";

import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Typography>&copy; BuyOrSell</Typography>
        </li>
      </ul>
    </footer>
  );
};
