import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));

const THEME = createTheme({
  typography: {
    fontFamily: `"Gabarito", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
