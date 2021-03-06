import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '@media (max-width: 1000px)' : {
      flexDirection: 'column'
    },
  },
  left: {
    margin: theme.spacing(2),
  },
  image: {
    maxWidth: '25rem',
    '@media (max-width: 1000px)' : {
      maxWidth: '100%',
      height: "auto",
    },
    height: "auto",
  },
  right: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    maxWidth: '30rem',
  },
  title: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  size: {
    marginBottom: theme.spacing(2),
  },
  price: {
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '7rem',
  }
}));

function ProductView() {
  const classes = useStyles();
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);


  const match = useRouteMatch<{ path: string }>();
  const product = products.find((p) => p.path === match.params.path);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!product) {
    return (
      <p>
        The product you are looking after doesn't exist. Return to the start page by clicking&nbsp;
        <Link style={{ color: "inherit" }} to="/">
          here!
        </Link>
      </p>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <img
          className={classes.image}
          src={product.image}
          alt={product.description}
        />
      </div>

      <div className={classes.right}>
        <Typography variant="h3" component="h3" className={classes.title}>
          {product.title}
        </Typography>
        <Typography variant="h5" component="h5" className={classes.description}>
          {product.description}
        </Typography>
        <Typography variant="h5" component="h5" className={classes.size}>
          {product.size}
        </Typography>
        <Typography variant="h5" component="h5" className={classes.price}>
          {product.price + " SEK"}
        </Typography>
        <Button
          onClick={() => addToCart(product)}
          size="small"
          color="primary"
          href=""
          variant="contained"
          className={classes.button}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductView;
