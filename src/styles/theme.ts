import { createTheme } from "@mui/material";
import { red as primary } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "1em 0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "1em 0",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          transition: "none",
        },
      },
    },
  },
});
