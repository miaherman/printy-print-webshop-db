import IconButton from "@material-ui/core/IconButton";
import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    footer: {
      width: "100%",
      position: "sticky",
      bottom: 0,
      backgroundColor: "#2F323A",
      color: "white"
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Link style={{ color: "inherit" }} to="/admin">
            <IconButton aria-label="" color="inherit">
                Admin
            </IconButton>
          </Link>
        </div>
    );
};

export default Footer;