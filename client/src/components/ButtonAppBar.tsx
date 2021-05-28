import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Badge, Theme } from "@material-ui/core";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import icon from "../icon.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  flex: {
    flexGrow: 1,
  },
  text: {
    color: "white",
    textDecoration: "none"
  },
  logo: {
    width: "2rem"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { cart } = useContext(CartContext);
  const { loggedIn, logOutUser } = useContext(UserContext);
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Link className={classes.text} to="/">
              <img className={classes.logo} src={icon} alt="icon"/>
            </Link>
            <div className={classes.flex} >
            </div>

          {loggedIn ? 
          <Link component={Button} to="/">
            <Button onClick={logOutUser} aria-label="" color="inherit">
                Logout
            </Button>
          </Link> : 
          <>
          <Link component={Button} to="/register">
          <Button aria-label="" color="inherit">
                Register
          </Button>
          </Link>
          <Link component={Button} to="/login">
            <Button aria-label="" color="inherit">
                Login
            </Button>
          </Link>
          </>}
          <Link style={{ color: "inherit" }} to="/checkout">
            <Button aria-label="" color="inherit">
              <Badge
                badgeContent={cart.reduce(
                  (a: any, b: any) => +a + +b.quantity,
                  0
                )}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
