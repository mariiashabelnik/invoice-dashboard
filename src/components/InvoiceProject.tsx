import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";

import { useContext } from "react";

import { StoreContext } from "../store";

import { ExpandMore, AccountCircle, Send } from "@mui/icons-material";
import { useState } from "react";

import { apiCreateInvoice } from "../api";

function InvoiceProject({ title, tasks, timers }: InvoiceProjectProps) {
  const { invoiceStore } = useContext<AppContextInterface>(StoreContext);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(100);

  const [includeTimer, setIncludeTimer] = useState<{ [key: number]: Boolean }>(
    {}
  ); // fetch all tasks with project id = id
  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  let sumPrice = 0;
  let foundTimers = false;

  const timerList = timers?.map((item) => {
    // find task from timer
    const taskItem = tasks?.find((tmpItem) => {
      return tmpItem.id === item.taskId;
    });

    //if date is older than 30 days
    const timerStart = new Date(item.start);
    if (timerStart.getTime() <= priorDate.getTime()) {
      return false;
    }

    foundTimers = true;

    const timerStop = new Date(item?.stop || "");

    let diffInSec = Math.round(
      (timerStop.getTime() - timerStart.getTime()) / 1000
    );

    const roundTime = 60 * 30;

    // we only allow half hours as a mininmum
    if (diffInSec < roundTime) {
      diffInSec = roundTime;
    }

    let diffInHours =
      (Math.round(diffInSec / roundTime) * roundTime) / (60 * 60);
    diffInHours = Math.round(diffInHours * 100) / 100;

    const itemPrice = diffInHours * price;
    if (includeTimer[item.id]) {
      sumPrice = sumPrice + itemPrice;
    }

    return (
      <TableRow
        key={item.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Checkbox
            checked={includeTimer[item.id] ? true : false}
            onClick={() => {
              const tmpObj = { ...includeTimer };
              if (tmpObj[item.id]) {
                tmpObj[item.id] = false;
              } else {
                tmpObj[item.id] = true;
              }
              setIncludeTimer(tmpObj);
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {taskItem?.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {diffInHours}
        </TableCell>
        <TableCell component="th" scope="row">
          {itemPrice}
        </TableCell>
      </TableRow>
    );
  });

  if (foundTimers === false) {
    return <></>;
  }

  // draw page
  return (
    <Box sx={{ m: 1 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{title}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>Round to mininmum 30 min</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Use</TableCell>
                  <TableCell>TASKS</TableCell>
                  <TableCell>TIME (h)</TableCell>
                  <TableCell>COST (kr)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{timerList}</TableBody>
            </Table>
          </TableContainer>
          <Typography align="right">Total price {sumPrice} kr</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
            }}
          >
            <TextField
              label="Customer"
              variant="standard"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ mx: 5 }}
              label="price"
              variant="standard"
              value={price}
              onChange={(e) => {
                setPrice(parseInt(e.target.value, 10));
              }}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">SEK</InputAdornment>
                ),
              }}
            />
            <Button
              onClick={async () => {
                const todayDate = new Date();
                const expireDate = new Date(
                  new Date().setDate(todayDate.getDate() + 30)
                );
                const invoiceObj = {
                  status: "not-payed",
                  expireDate: expireDate.toISOString(),
                  customer: name,
                  sumPrice: sumPrice,
                };
                //create invoice -> send invoice to API and create invoice there -> load this in [] Store/Context
                await apiCreateInvoice(invoiceObj);
                invoiceStore?.loadAllInvoices();
              }}
              variant="contained"
              endIcon={<Send />}
            >
              Create invoice
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default InvoiceProject;
