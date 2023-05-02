import { createTheme } from "@mui/material/styles"; //"@mui/system";

export const defaultTheme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    primary: {
      main: "#556cd6",
    },
  },
});
