import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./Theme";

import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Checkout from "./components/Checkout";
import ButtonAppBar from "./components/ButtonAppBar";
import CartProvider from "./contexts/CartContext";
import ProductView from "./components/ProductView";
import Admin from "./components/Admin";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import Orderconfirmation from "./components/Orderconfirmation";
import PageAnimation from "./wrapper/PageAnimation";
import { AnimatePresence } from "framer-motion";
import ProductProvider from "./contexts/ProductContext";
import UserProvider from "./contexts/UserContext";
import OrderProvider from "./contexts/OrderContext";
import Footer from "./components/Footer";

const useStyles = makeStyles((theme) => ({
  App: {
    minHeight: "100vh",
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
            <OrderProvider>
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
                <Footer />
              </CartProvider>
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
