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

export default function Timers() {
  const { timeStore, taskStore } =
    useContext<AppContextInterface>(StoreContext);

  const timerUi = timeStore?.timers.map((item) => {
    console.log(item);
    const taskItem = taskStore?.tasks?.find((tmpItem) => {
      return tmpItem.id === item.taskId;
    });
    const start = DateTime.fromISO(item.start);
    const stop = DateTime.fromISO(item.stop);

    return (
      <TableRow key={item.id}>
        <TableCell>{taskItem?.title}</TableCell>

        <TableCell>{start.toFormat("DD t")}</TableCell>
        <TableCell>{stop.toFormat("DD t")}</TableCell>
      </TableRow>
    );
  });

  return (
    <Box>
      <Typography variant="h5" align="center">
        All timers
      </Typography>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 650 }} aria-label="Invoices">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Stop</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{timerUi}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
