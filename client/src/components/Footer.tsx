import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    footer: {
      display: "flex",
      width: "100%",
      position: "fixed",
      bottom: 0,
      backgroundColor: "#2F323A",
      color: "white",
      fontSize: "1rem",
      padding: "1rem",
      justifyContent: "space-evenly",
      alignItems: "space-between",
      textAlign: "center",
      textDecoration: "none"
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Link style={{ color: "inherit" }} to="/admin">
                Admin
          </Link>
          <Link style={{ color: "inherit" }} to="/aboutus">
                About us
          </Link>
          <Link style={{ color: "inherit" }} to="/monkies">
                About monkies
          </Link>
        </div>
    );
};

export default Footer;