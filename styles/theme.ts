import { createTheme } from "@mui/material/styles";

const fontFamily = [
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "sans-serif",
].join(",");

export const theme = createTheme({
  palette: {
    primary: { main: "#4F46E5", light: "#818CF8", dark: "#3730A3" },
    secondary: { main: "#0EA5E9" },
    success: { main: "#059669" },
    error: { main: "#E11D48" },
    warning: { main: "#D97706" },
    info: { main: "#4F46E5" },
    text: { primary: "#0F172A", secondary: "#64748B" },
    divider: "#E2E8F0",
    background: { default: "#F8FAFC", paper: "#FFFFFF" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily,
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          "& fieldset": { borderColor: "#E2E8F0" },
          "&:hover fieldset": { borderColor: "#A5B4FC" },
        },
        input: { fontVariantNumeric: "tabular-nums" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.9rem", color: "#64748B" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, paddingInline: 16, minHeight: 44 },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 14, fontWeight: 500, alignItems: "center" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 18 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, color: "#0F172A" },
      },
    },
  },
});
