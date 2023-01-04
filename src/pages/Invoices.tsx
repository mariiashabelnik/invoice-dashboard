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
  Select,
  MenuItem,
} from "@mui/material";

export default function Invoices() {
  const { invoiceStore } = useContext<AppContextInterface>(StoreContext);

  const invoicesUI = invoiceStore?.invoices.map((item) => {
    const expire = DateTime.fromISO(item.expireDate);

    return (
      <TableRow key={item.id} data-test-id={`invoiceList-${item.id}`}>
        <TableCell>
          <Select
          data-test-id={`invoiceSelect-${item.id}`}
            value={item.status}
            onChange={async (e) => {
              // update invoice
              await apiSetInvoiceStatus(item.id, { status: e.target.value });
              // reload context
              invoiceStore.loadAllInvoices();
            }}
          >
            <MenuItem value="not-payed">Not payed</MenuItem>
            <MenuItem value="payed">Payed</MenuItem>
            <MenuItem value="late">Late</MenuItem>
          </Select>
        </TableCell>
        <TableCell>{expire.toFormat("DD")}</TableCell>
        <TableCell>{item.customer}</TableCell>
        <TableCell>{item.sumPrice} sek</TableCell>
      </TableRow>
    );
  });

  return (
    <Box>
      <Typography variant="h5" align="center">
        Invoices
      </Typography>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 650 }} aria-label="Invoices">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Expire</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{invoicesUI}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
