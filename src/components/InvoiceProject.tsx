import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
} from "@mui/material";

import { ExpandMore, AccountCircle } from "@mui/icons-material";
import { useState } from "react";

function InvoiceProject({ title, tasks, timers }: InvoiceProjectProps) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(100);

  console.log("Inside InvoiceProject", tasks);
  // fetch all tasks with project id = id

  const todayDate = new Date();
  const priorDate = new Date(new Date().setDate(todayDate.getDate() - 30));

  let sumPrice = 0;

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
    sumPrice = sumPrice + itemPrice;

    return (
      <TableRow
        key={item.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {taskItem?.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {diffInHours} hours
        </TableCell>
        <TableCell component="th" scope="row">
          {itemPrice} kr
        </TableCell>
      </TableRow>
    );
  });

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
                  <TableCell>TASKS</TableCell>
                  <TableCell>TIME</TableCell>
                  <TableCell>COST</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{timerList}</TableBody>
            </Table>
          </TableContainer>
          <Typography>Total price {sumPrice} kr</Typography>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              label="Name"
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
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default InvoiceProject;
