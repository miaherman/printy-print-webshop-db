import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { OrderContext } from "../contexts/OrderContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  titleDiv: {
    flexDirection: 'column',
    textAlign: 'left',
    alignItems: 'left'
  }
});

export default function OrderTable() {
  const classes = useStyles();
  const { orders } = useContext(OrderContext);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell align="left">Shipping</TableCell>
            <TableCell align="left">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow>

              <TableCell className={classes.titleDiv} component="th" scope="row">

                 {order.products.map((product) => (
                  <p>{product.title}</p>
                  ))} 
                
              </TableCell>

              <TableCell align="left">{order.delivery.shippingMethod}</TableCell>
              <TableCell align="left">{order.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
