import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { OrderContext } from "../contexts/OrderContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  titleDiv: {
    flexDirection: "column",
    textAlign: "left",
    alignItems: "left",
  },
});

export default function OrderTable() {
  const classes = useStyles();
  const { orders } = useContext(OrderContext);

    function getOrderDate(specificOrder: any) {
      let orderDate = new Date(specificOrder.createdAt)
      orderDate.setDate(orderDate.getDate())
      let formatted_orderDate = orderDate.getDate() + "/" + (orderDate.getMonth() + 1) + " " + orderDate.getFullYear();
      return formatted_orderDate
    }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="left">Products</TableCell>
            <TableCell align="left">Customer</TableCell>
            <TableCell align="left">Shipping</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">OrderID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow>
              <TableCell>
                {getOrderDate(order)}
              </TableCell>
              <TableCell
                className={classes.titleDiv}
                component="th"
                scope="row">
                {order.products.map((product) => (
                  <p>{product.title + ' (' + product.quantity + ')'}</p>
                ))}
              </TableCell>
              <TableCell>
                {order.customer.firstName + ' ' + order.customer.lastName}
              </TableCell>
              <TableCell align="left">
                {order.delivery.shippingMethod}
              </TableCell>
              <TableCell align="left">{order.price}</TableCell>

              <TableCell align="left">{order._id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
