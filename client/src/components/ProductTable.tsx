import React, { useContext, useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

import { ProductContext } from "../contexts/ProductContext";

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

export default function ProductTable() {
  const classes = useStyles();
  const { products, editProduct } = useContext(ProductContext);
  const [newStockValue, setNewStockValue] = useState(0);

  const handleOnchangeStock = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStockValue(Number(e.target.value))
}

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artwork</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Stock Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow>

              <TableCell align="left">
                <Avatar>
                  <img src={product.image} alt={product.description} />
                </Avatar>
              </TableCell>
              <TableCell align="left">{product.title}</TableCell>
              <TableCell align="left">{"Stock quantity: " + product.stock}</TableCell>
              <TableCell align="left"><TextField
                  onChange={handleOnchangeStock}
                  id="quantity"
                  label="Change stock quantity"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <IconButton onClick={() => editProduct(product, newStockValue)} edge="end" aria-label="save">
                  <SaveIcon />
                </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
