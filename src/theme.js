import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark", // Set the default mode to light

    // Light mode colors
    primary: {
      main: '#FFFFFF', // Primary color for light mode
    },
    secondary: {
      main: '#000000', // Secondary color for light mode
    },

    // Dark mode colors
    dark: {
      primary: '#000000', // Primary color for dark mode
      secondary: '#FFFFFF', // Secondary color for dark mode
    },
  },
});

export default theme;
