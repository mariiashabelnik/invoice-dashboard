import React from "react";
import ReactDOM from "react-dom/client";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Store from "./store";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Timers from "./pages/Timers";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createinvoice",
    element: <CreateInvoice />,
  },
  {
    path: "/invoices",
    element: <Invoices />,
  },
  {
    path: "/timers",
    element: <Timers />,
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
    <Store>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="lg">
          <Box p={2}>
            <RouterProvider router={router} />
          </Box>
        </Container>
      </ThemeProvider>
    </Store>
  </React.StrictMode>
);
