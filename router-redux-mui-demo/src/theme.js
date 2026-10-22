import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    primary: { main: "#1f5c66" },
    secondary: { main: "#e8a33d" },
    background: { default: "#f4f7f8" }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "Manrope, sans-serif",
    h4: { fontWeight: 800 },
    h6: { fontWeight: 800 }
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } }
  }
});
