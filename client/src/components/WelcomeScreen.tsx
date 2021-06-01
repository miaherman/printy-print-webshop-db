import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    height: "35rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginLeft: "1rem",
    marginRight: "1rem",
    fontFamily: ["Monoton", "cursive"].join(","),
  },
  text: {
    textAlign: "center",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
}));

const WelcomeScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h1" className={classes.title}>
        PrintyPrint
      </Typography>
      <Typography variant="h6" className={classes.text}>
        Exclusive and hand picked prints from leading art consultants
      </Typography>
    </div>
  );
};

export default WelcomeScreen;
