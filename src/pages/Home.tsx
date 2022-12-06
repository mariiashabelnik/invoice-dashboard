import { useContext } from "react";

import { apiSetInvoiceStatus } from "../api";

import { DateTime } from "luxon";

import { StoreContext } from "../store";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Home() {
  const { invoiceStore, projectStore, timeStore, taskStore } =
    useContext<AppContextInterface>(StoreContext);

  // total time logged
  let totalTime = 0;
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));
  timeStore?.timers.forEach((item) => {
    const start = new Date(item.start);
    if (start.getTime() <= priorDate.getTime()) {
      return false;
    }
    const stop = new Date(item.stop);
    totalTime = totalTime + (stop.getTime() - start.getTime());
  });

  // convert totalTime to hours
  totalTime = Math.round((totalTime / (60 * 60 * 1000)) * 100) / 100;

  // total invoiced
  let totalInvoice = 0;
  invoiceStore?.invoices.forEach((item) => {
    totalInvoice = totalInvoice + item.sumPrice;
  });

  return (
    <Box>
      <Typography variant="h5" align="center">
        Overview
      </Typography>
      <Typography variant="h6" align="center">
        Number of projects: {projectStore?.projects.length}
      </Typography>
      <Typography variant="h6" align="center">
        Number of tasks: {taskStore?.tasks.length}
      </Typography>
      <Typography variant="h6" align="center">
        Number of invoices: {invoiceStore?.invoices.length}
      </Typography>
      <Typography variant="h6" align="center">
        Logged time last 30 days: ~ {totalTime} hours
      </Typography>
      <Typography variant="h6" align="center">
        Total invoiced: {totalInvoice} sek
      </Typography>
    </Box>
  );
}
