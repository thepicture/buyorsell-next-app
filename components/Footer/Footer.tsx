import React from "react";

import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <Typography>&copy; BuyOrSell</Typography>
        </li>
      </ul>
      <style jsx>
        {`
          .footer {
            height: 64px;
            position: absolute;
            bottom: 0;
            text-align: center;
            width: 100%;
            color: white;
            background: #111;
          }
        `}
      </style>
    </footer>
  );
};
