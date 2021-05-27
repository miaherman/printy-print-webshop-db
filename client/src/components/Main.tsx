import { makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import ProductGrid from "./ProductGrid";
import WelcomeScreen from './WelcomeScreen'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    margin: 0,
    paddingBottom: "5rem"
  },
  title: {},
}));

function Main() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const classes = useStyles();

  return (
    <main className={classes.main}>
      <WelcomeScreen />
      <ProductGrid />
    </main>
  );
}
export default Main;
