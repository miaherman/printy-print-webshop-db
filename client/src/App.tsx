import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Checkout from "./components/Checkout";
import ButtonAppBar from "./components/buttonAppBar";
import CartProvider from "./contexts/CartContext";
import ProductView from "./components/productView";
import Admin from "./components/admin";
import Main from "./components/main";
import Register from "./components/register";
import Login from "./components/login";
import Orderconfirmation from "./components/Orderconfirmation";
import PageAnimation from "./wrapper/PageAnimation";
import { AnimatePresence } from "framer-motion";
import ProductProvider from "./contexts/ProductContext";
import UserProvider from "./contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  App: {
    minHeight: '100vh'
  },
}));

function App() {
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <ThemeProvider theme={theme}>
        <UserProvider>
        <ProductProvider>
        <CartProvider>
          <CssBaseline />
          <ButtonAppBar />
          <AnimatePresence exitBeforeEnter>

          <Switch location={location} key={location.key}>
              <Route exact path="/">
                <PageAnimation>
                  <Main />
                </PageAnimation>
              </Route>

              <Route exact path="/register">
                <PageAnimation>
                  <Register />
                </PageAnimation>
              </Route>
              
              <Route exact path="/login">
                <PageAnimation>
                  <Login />
                </PageAnimation>
              </Route>

              <Route exact path="/admin">
                <PageAnimation>
                  <Admin />
                </PageAnimation>
              </Route>

              <Route path="/products/:path">
                <PageAnimation>
                  <ProductView />
                </PageAnimation>
              </Route>

              <Route path="/checkout">
                <PageAnimation>
                  <Checkout />
                </PageAnimation>
              </Route>

              <Route path="/orderconfirmation">
                <PageAnimation>
                  <Orderconfirmation />
                </PageAnimation>
              </Route>
          </Switch>
          </AnimatePresence>
        </CartProvider>
        </ProductProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
