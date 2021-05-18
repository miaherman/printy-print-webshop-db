import { makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useContext, useState, ChangeEvent } from "react";
import { ProductContext } from "../contexts/ProductContext";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) => ({
  admin: {
    margin: 0,
    marginTop: theme.spacing(15),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  listItem: {
    marginBottom: "0.5rem",
  },
  listItemSecondaryAction: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function Admin() {
  const { products, editProduct } = useContext(ProductContext);
  const [newStockValue, setNewStockValue] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();

  const handleOnchangeStock = (e: ChangeEvent<HTMLInputElement>) => {
      setNewStockValue(Number(e.target.value))
  }

  return (
    <main className={classes.admin}>
      <h1>Hej admin</h1>

      <Typography variant="h6" className={classes.title}>
        Produkter
      </Typography>
      <div className={classes.demo}>
        <List dense={false}>
          {products.map((product) => (
            <ListItem className={classes.listItem} key={product._id}>
              <ListItemAvatar>
                <Avatar>
                  <img src={product.image} alt={product.description} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={product.title} />
              <ListItemText secondary={"Lagersaldo: " + product.stock} />
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>   
                <TextField
                  onChange={handleOnchangeStock}
                //   value={product.stock}
                  id="quantity"
                  label="Ändra lagersaldo"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <IconButton onClick={() => editProduct(product, newStockValue)} edge="end" aria-label="save">
                  <SaveIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>

      <Typography variant="h6" className={classes.title}>
        Beställningar
      </Typography>
      <div className={classes.demo}>
        <List dense={false}>
          {products.map((product) => (
            <ListItem className={classes.listItem} key={product._id}>
              <ListItemAvatar>
                <Avatar>
                  <img src={product.image} alt={product.description} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={product.title} />
              <ListItemText secondary={"Lagersaldo: " + product.stock} />
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>   
                <TextField
                  onChange={handleOnchangeStock}
                  id="quantity"
                  label="Ändra lagersaldo"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>

    </main>
  );
}
export default Admin;
