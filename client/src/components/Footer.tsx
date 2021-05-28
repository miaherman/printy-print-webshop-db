import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, Theme, Button } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        display: "flex",
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2F323A",
        padding: "0.2rem",
        justifyContent: "space-evenly",
        alignItems: "space-between",
        textAlign: "center",
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Link component={Button} to="/admin">
                Admin
          </Link>
            <Link component={Button} to="/aboutus">
                About us
          </Link>
            <Link component={Button} to="/monkies">
                About monkies
          </Link>
        </div>
    );
};

export default Footer;