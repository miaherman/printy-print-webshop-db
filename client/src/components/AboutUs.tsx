import { makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";

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

const AboutUs = () => {
  const classes = useStyles();

  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  return (
    <div className={classes.root}>
      <p>Do you love art, but have no money? Then this is not the site for you. We take pride in the carefully selected art prints we share with the world. Art should be expensive and for the selected few. Art should be making you feel sophisticated by spendig a lot of money on it. Money equals power, make it rain b.</p>
      <p></p>
    </div>
  );
};

export default AboutUs;
