import React from "react";
import ReactDOM from "react-dom/client";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <>Contact</>,
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Box p={2}>
          <RouterProvider router={router} />
        </Box>
      </Container>
    </ThemeProvider>
  </React.StrictMode>
);
