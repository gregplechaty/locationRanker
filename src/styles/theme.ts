import { createTheme } from "@mui/material/styles"; //"@mui/system";

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7db53f",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Crimson Pro",
    h1: {
      fontSize: "5rem",
    },
    h4: {
      fontSize: "2rem",
    },
  },
});
