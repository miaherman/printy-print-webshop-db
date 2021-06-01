import { makeStyles, Theme } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
//import { CartContext } from "../contexts/CartContext";
import { OrderContext } from "../contexts/OrderContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: theme.spacing(15),
    textAlign: "center",
    padding: "1rem",
  },
}));

const Orderconfirmation = () => {
  const classes = useStyles();

  const { order } = useContext(OrderContext);

  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  return (
    <div className={classes.root}>
      <h2>Thank you for your order!</h2>
      <h3>Order number: {order._id}</h3>
      <p>
        An order confirmation has been sent to your email address.
      </p>
    </div>
  );
};

export default Orderconfirmation;
