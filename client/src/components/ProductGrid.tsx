import Grid from "@material-ui/core/Grid";
import React, { useContext, useState, useEffect } from "react";
import { Product } from "../contexts/ProductContext";


import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CartContext } from "../contexts/CartContext";
// import { products } from "../products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductContext } from "../contexts/ProductContext";

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    margin: 0,
  },
  root: {
    margin: theme.spacing(3),
    width: 270,
  },
  media: {
    height: 420,
  },
  title: {
    color: theme.palette.primary.main,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalImage: {
    height: 300,
    width: "auto",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
  },
}));

function ProductGrid() {
  const classes = useStyles();
  const { addToCart } = useContext(CartContext);
  const { products, categories } = useContext(ProductContext);

  // Skapar ett lokalt state för en produktlista som från början innehåller alla produkter
  const [filteredProducts, getFilteredProducts] = useState(products);

  // Skapar en tom lista som sen ska fyllas med filtrerade produkter baserat på
  // vilken knapp man trycker på
  let filteredProductsArray: Product[] = [];
  
  // Sätter statet till att innehålla alla produkter när sidan/komponenten laddas om
  useEffect(() => {
    getFilteredProducts(products);
  }, [products]);

  // Sätter också statet till att innehålla alla produkter. Används när man klickar på "All products"
  const getAllProducts = () => {
    getFilteredProducts(products);
  };

  // Tar en specifik kategori som argument när man klickar på en specifik kategoriknapp
  const getCategory = (specificCategory: string) => {
    products.forEach((product) => {

      if (product.categories.includes(specificCategory)) {
        
        // Om en produkt i products innehåller den specifika kategorin läggs denna till i 
        // filteredProductsArray som var tom sen innan.
        filteredProductsArray.push(product);

        // Sen uppdateras det lokala statet så att filteredProducts innehåller resultatet
        getFilteredProducts(filteredProductsArray);
      }
    });
  };

  return (
    <div>
      <div className={classes.button}>
        <Button color="primary"  size="small" onClick={() => getAllProducts()}>All products</Button>
        {categories.map((category) => (
          <Button
            onClick={() => getCategory(category)}
            size="small"
            color="primary"
            href="">
            {category}
          </Button>
        ))}
      </div>

      <Grid container justify="center" className={classes.gridContainer}>
          {filteredProducts.map((product) => (
            <motion.div key={product.title} whileHover={{ scale: 1.05 }}>
              <Grid item>
                <Card className={classes.root}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/products/${product.path}`}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={product.image}
                        title={product.title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.title}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {product.price + " SEK"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    <Button
                      onClick={() => addToCart(product)}
                      size="small"
                      color="primary"
                      href=""
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </motion.div>
          ))}
        </Grid>
    </div>
  );
}

export default ProductGrid;
